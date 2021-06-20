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
exports.CheckTokenUser = exports.Logout = exports.Login = exports.GetListAccount = exports.AddOneAccount = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const { FORBIDDEN, CREATED, OK, BAD_GATEWAY, BAD_REQUEST } = http_status_codes_1.default;
const controller_1 = require("@database/account/controller");
const constants_1 = require("@shared/constants");
const auth_1 = require("@shared/auth");
/**
 * Add one account.
 */
const AddOneAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let account = {
        username: req.body.username,
        password: req.body.password,
        token: ""
    };
    console.log(account);
    if (req.body.secret !== 122112) {
        return res.status(FORBIDDEN).send({ message: constants_1.NotPermission });
    }
    else if (!account.username || !account.password) {
        return res.status(FORBIDDEN).send({ message: "Invalid username/password" });
    }
    else {
        if (yield controller_1.AddOne(account)) {
            return res.status(CREATED).send({ message: "Add account success" });
        }
        else {
            return res.status(BAD_GATEWAY).send({ message: constants_1.ErrorSystem });
        }
    }
});
exports.AddOneAccount = AddOneAccount;
/**
 * Get all accounts
 */
const GetListAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let list = yield controller_1.GetList();
    return res.status(OK).send({ message: "Get list success", data: list });
});
exports.GetListAccount = GetListAccount;
/**
 * Login width account
 */
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let account = yield controller_1.GetOne(req.body.username);
    // console.log(account)
    if (!!account) {
        if (account.password === req.body.password) {
            let info = {
                username: req.body.username
            };
            let token = auth_1.GenerateToken(info);
            controller_1.UpdateOne(info.username, { token: token });
            return res.status(OK).send({ message: "Login success", data: info, token });
        }
        else {
            res.status(BAD_GATEWAY).send({ message: "Invalid username/password" });
        }
    }
    else {
        return res.status(BAD_GATEWAY).send({ message: "Account not exists" });
    }
});
exports.Login = Login;
/**
 * Logout width account
 */
const Logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers.token;
    let dataToken = yield auth_1.DecodeToken(token);
    // console.log(data)
    yield controller_1.UpdateOne(dataToken.data.username, { token: "" });
    return res.status(OK).send({ message: "Logout success" });
});
exports.Logout = Logout;
/**
 * Check token from user request
 */
const CheckTokenUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(OK).send({ message: "Token avaliable" });
});
exports.CheckTokenUser = CheckTokenUser;
