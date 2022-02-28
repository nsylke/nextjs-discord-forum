import type { NextApiRequest, NextApiResponse } from 'next';
import database from '../../../lib/mongo';
import { ObjectId } from 'mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const body = JSON.parse(JSON.stringify(req.body));
    const { db } = await database();

    await db?.collection('replies').insertOne({
        topicId: new ObjectId(body.topicId),
        userId: body.userId,
        content: body.content,
        createdAt: new Date()
    });

    await fetch(process.env.DISCORD_WEBHOOK_URL!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            embeds: [
                {
                    title: `New Reply`,
                    description: `Reply by <@${body.userId}> has been created. [View](http://localhost:3000/t/${body.topicId})`
                }
            ]
        })
    });

    res.status(200).end();
};

export default handler;
