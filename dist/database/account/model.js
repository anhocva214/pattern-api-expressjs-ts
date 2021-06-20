"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    username: String,
    password: String,
    token: String
});
exports.AccountModel = mongoose_1.model('Account', schema);
