import { ENV } from '@helpers/env.helper';
import { connect, connection } from 'mongoose';

export async function connectMongoDB(): Promise<void> {
    await connect(`mongodb://${ENV.MONGO_USER}:${ENV.MONGO_PASS}@${ENV.MONGO_HOST}:${ENV.MONGO_PORT}`, {
        dbName: ENV.MONGO_DB
    });
}

export async function closeMongoDB(): Promise<void> {
    await connection.close()
}