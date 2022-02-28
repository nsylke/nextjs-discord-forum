import { Db, MongoClient } from 'mongodb';

interface Database {
    client: MongoClient | null;
    db: Db | null;
}

let client: MongoClient | null;
let db: Db | null;

const database = async (): Promise<Database> => {
    if (client && db) {
        return { client, db };
    }

    client = new MongoClient(process.env.MONGO_URL!);
    await client.connect();
    db = client.db(process.env.MONGO_DB!);
    return { client, db };
};

export default database;
export type { Database };
