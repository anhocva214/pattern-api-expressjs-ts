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
exports.UploadDirveOrder = exports.ExportDBOrder = exports.ListAllOrder = exports.ListRangeOrder = exports.DeleteOneOrder = exports.UpdateOneOrder = exports.AddOneOrder = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const uuid_1 = require("uuid");
const { BAD_GATEWAY, CREATED, OK } = http_status_codes_1.default;
const controller_1 = require("@database/order/controller");
const drive_backup_1 = require("@shared/drive.backup");
/**
 * Add one order.
 */
const AddOneOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    let order = {
        id: uuid_1.v1().toString(),
        description: req.body.description,
        type: req.body.type,
        time: req.body.time,
        value: req.body.value
    };
    if (!!order.description && !!order.time && !!order.type && !!order.value) {
        if (yield controller_1.AddOne(order)) {
            return res.status(CREATED).send({ message: "Add one order success" });
        }
        else {
            return res.status(BAD_GATEWAY).send({ message: "Invalid info" });
        }
    }
    else {
        return res.status(BAD_GATEWAY).send({ message: "Not enough info" });
    }
});
exports.AddOneOrder = AddOneOrder;
/**
 * Update one order.
 */
const UpdateOneOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.description || !req.body.value || !req.body.type || !req.body.id) {
        return res.status(BAD_GATEWAY).send({ message: "Not enough info" });
    }
    else if (req.body.value <= 0) {
        return res.status(BAD_GATEWAY).send({ message: "type of value is number and is greater than 0" });
    }
    else if (req.body.type !== 1 && req.body.type !== 2) {
        return res.status(BAD_GATEWAY).send({ message: "Type only 1 or 2" });
    }
    else {
        let orderUpdate = {
            description: req.body.description,
            value: req.body.value,
            type: req.body.type
        };
        yield controller_1.UpdateOne(req.body.id, orderUpdate);
        return res.status(OK).send({ message: "Update order success!" });
    }
});
exports.UpdateOneOrder = UpdateOneOrder;
/**
 * Update one order.
 */
const DeleteOneOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof req.body.id !== "string") {
        return res.status(BAD_GATEWAY).send({ message: "Invalid id" });
    }
    else {
        yield controller_1.DeleteOne(req.body.id);
        return res.status(OK).send({ message: "Delete order success!" });
    }
});
exports.DeleteOneOrder = DeleteOneOrder;
/**
 * List range order.
 */
const ListRangeOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let page = req.params.page;
    let orderList = yield controller_1.GetListRange(page, 10);
    return res.status(OK).send({ message: "Get list range success!", data: orderList });
});
exports.ListRangeOrder = ListRangeOrder;
/**
 * List all order.
 */
const ListAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let orderList = yield controller_1.GetListAll();
    return res.status(OK).send({ message: "Get list all success!", data: orderList });
});
exports.ListAllOrder = ListAllOrder;
/**
 * Export databate order.
 */
const ExportDBOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield drive_backup_1.CreateFileJson();
    return res.status(CREATED).send({ message: "Create file success!" });
});
exports.ExportDBOrder = ExportDBOrder;
/**
 * Upload orders file to drive google
 */
const UploadDirveOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield drive_backup_1.Drive();
    return res.status(OK).send({ message: "Upload orders file success!" });
});
exports.UploadDirveOrder = UploadDirveOrder;
