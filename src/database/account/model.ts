import { Schema, model } from 'mongoose';
import { Account } from '@entities/account';

const schema = new Schema<Account>({
    username: String,
    password: String,
    token: String
});

export const AccountModel = model<Account>('Account', schema);
