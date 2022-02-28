import type { NextApiRequest, NextApiResponse } from 'next';
import database from '../../lib/mongo';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    const { db } = await database();

    const topics = await db
        ?.collection('topics')
        .aggregate([
            {
                $lookup: {
                    from: 'replies',
                    localField: '_id',
                    foreignField: 'topicId',
                    as: 'replies'
                }
            },
            {
                $addFields: {
                    repliesCount: { $size: '$replies' }
                }
            },
            {
                $project: {
                    replies: 0
                }
            }
        ])
        .project({ name: 1, repliesCount: 1 })
        .toArray();

    res.status(200).json(topics);
};

export default handler;
