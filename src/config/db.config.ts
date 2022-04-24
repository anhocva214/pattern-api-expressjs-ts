import { connect } from 'mongoose';

export async function connectDB(): Promise<void> {
    await connect('mongodb+srv://test:test@cluster0.baswu.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}