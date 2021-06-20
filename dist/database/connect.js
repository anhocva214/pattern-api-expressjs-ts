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
exports.ConnectDB = void 0;
const mongoose_1 = require("mongoose");
const DB = `mongodb+srv://personal_management:122112@cluster0.baswu.mongodb.net/personal?retryWrites=true&w=majority`;
const DB_local = `mongodb://127.0.0.1:27017/personal`;
function ConnectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        // 4. Connect to MongoDB
        yield mongoose_1.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });
}
exports.ConnectDB = ConnectDB;
