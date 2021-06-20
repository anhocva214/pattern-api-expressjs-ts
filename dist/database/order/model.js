"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    id: { type: String, required: true },
    description: String,
    time: Number,
    type: Number,
    value: Number
});
exports.OrderModel = mongoose_1.model('Order', schema);
