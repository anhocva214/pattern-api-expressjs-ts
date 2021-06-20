"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetListAll = exports.GetListRange = exports.DeleteOne = exports.UpdateOne = exports.AddOne = void 0;
const model_1 = require("./model");
// Add one order
const AddOne = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = new model_1.OrderModel(order);
    try {
        yield doc.save();
        return true;
    }
    catch (e) {
        console.log("Catch add one order: ", e);
        return false;
    }
});
exports.AddOne = AddOne;
// Update one order
const UpdateOne = (id, dataUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.OrderModel.updateOne({ id: id }, dataUpdate);
});
exports.UpdateOne = UpdateOne;
// Delete one order
const DeleteOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.OrderModel.deleteOne({ id: id });
});
exports.DeleteOne = DeleteOne;
// Get order list by range
const GetListRange = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.OrderModel.find({}).sort({ time: -1 }).skip((page - 1) * limit).limit(limit).exec();
});
exports.GetListRange = GetListRange;
// Get all order
const GetListAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.OrderModel.find({});
});
exports.GetListAll = GetListAll;
