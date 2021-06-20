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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAPIs = exports.DecodeToken = exports.GenerateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("./constants");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const { UNAUTHORIZED } = http_status_codes_1.default;
const controller_1 = require("@database/account/controller");
// Generate token to authenticate users
const GenerateToken = (data) => {
    let token = jsonwebtoken_1.default.sign({ data }, constants_1.SecretJWT, { expiresIn: '1h' });
    return token;
};
exports.GenerateToken = GenerateToken;
// Decode token from request of users
const DecodeToken = (token) => {
    try {
        let data = jsonwebtoken_1.default.verify(token, constants_1.SecretJWT);
        return data;
    }
    catch (e) {
        return false;
    }
};
exports.DecodeToken = DecodeToken;
const AuthAPIs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.headers)
    let token = req.headers.token;
    let dataToken = exports.DecodeToken(token);
    if (!!dataToken) {
        let username = dataToken.data.username;
        let account = yield controller_1.GetOne(username);
        if (!account) {
            return res.status(UNAUTHORIZED).send({ message: "Invalid token" });
        }
        else if (account.token != token) {
            return res.status(UNAUTHORIZED).send({ message: "Invalid token" });
        }
        else {
            next();
        }
    }
    else {
        return res.status(UNAUTHORIZED).send({ message: "Invalid token" });
    }
});
exports.AuthAPIs = AuthAPIs;
