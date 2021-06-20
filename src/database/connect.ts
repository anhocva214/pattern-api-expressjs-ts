import { connect } from 'mongoose';

const DB = ``;
const DB_local = `mongodb://127.0.0.1:27017/<db_name>`
 
export async function ConnectDB(): Promise<void> {
    // 4. Connect to MongoDB
    await connect(DB_local, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

}

