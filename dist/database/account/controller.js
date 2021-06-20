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
exports.UpdateOne = exports.GetOne = exports.GetList = exports.AddOne = void 0;
const model_1 = require("./model");
const AddOne = (account) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = new model_1.AccountModel(account);
    try {
        yield doc.save();
        return true;
    }
    catch (e) {
        console.log("Cach error add one account: ", e);
        return false;
    }
});
exports.AddOne = AddOne;
const GetList = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.AccountModel.find({});
});
exports.GetList = GetList;
const GetOne = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield model_1.AccountModel.findOne({ username: username }).exec();
    return account;
});
exports.GetOne = GetOne;
const UpdateOne = (username, dataUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    yield model_1.AccountModel.updateOne({ username: username }, dataUpdate);
});
exports.UpdateOne = UpdateOne;
