import type { NextApiRequest, NextApiResponse } from 'next';
import database from '../../../lib/mongo';
import { ObjectId } from 'mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.id as string;

    const { db } = await database();

    const topic = await db
        ?.collection('topics')
        .aggregate([
            {
                $match: {
                    _id: new ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'replies',
                    localField: '_id',
                    foreignField: 'topicId',
                    as: 'replies'
                }
            }
        ])
        .next();

    res.status(200).json(topic);
};

export default handler;
