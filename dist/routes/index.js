"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("@shared/auth");
// Order
const order_1 = require("./order");
// Account
const account_1 = require("./account");
// Account-route
const accountRouter = express_1.Router();
accountRouter.post('/add', account_1.AddOneAccount);
accountRouter.get('/list', auth_1.AuthAPIs, account_1.GetListAccount);
accountRouter.post('/login', account_1.Login);
accountRouter.get('/logout', auth_1.AuthAPIs, account_1.Logout);
accountRouter.get('/check-token', auth_1.AuthAPIs, account_1.CheckTokenUser);
// Order-route
const orderRouter = express_1.Router();
orderRouter.post('/add', auth_1.AuthAPIs, order_1.AddOneOrder);
orderRouter.post('/update', auth_1.AuthAPIs, order_1.UpdateOneOrder);
orderRouter.post('/delete', auth_1.AuthAPIs, order_1.DeleteOneOrder);
orderRouter.get('/list/:page', auth_1.AuthAPIs, order_1.ListRangeOrder);
orderRouter.get('/list-all', auth_1.AuthAPIs, order_1.ListAllOrder);
orderRouter.get('/export', order_1.ExportDBOrder);
orderRouter.get('/upload-drive', order_1.UploadDirveOrder);
// Export the base-router
const baseRouter = express_1.Router();
baseRouter.use('/order', orderRouter);
baseRouter.use('/account', accountRouter);
exports.default = baseRouter;
