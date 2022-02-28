import type { NextApiRequest, NextApiResponse } from 'next';
import database from '../../../lib/mongo';
import { ObjectId } from 'mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const body = JSON.parse(JSON.stringify(req.body));
    const { db } = await database();
    const id = new ObjectId();

    await db?.collection('topics').insertOne({
        _id: id,
        name: body.name,
        userId: body.userId,
        createdAt: new Date()
    });

    await db?.collection('replies').insertOne({
        topicId: id,
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
                    title: `New Topic`,
                    description: `${body.name} by <@${body.userId}> has been created. [View](http://localhost:3000/t/${id})`
                }
            ]
        })
    });

    res.status(201).json({ id });
};

export default handler;
