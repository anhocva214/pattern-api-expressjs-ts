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
exports.CreateFileJson = exports.Drive = void 0;
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const googleapis_1 = require("googleapis");
const path_1 = __importDefault(require("path"));
const controller_1 = require("@database/order/controller");
const PATH_TO_CREDENTIALS = path_1.default.resolve(`${__dirname}/../files/client_secret.json`);
// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/drive"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = `${__dirname}/../files/token.json`;
const Drive = () => {
    // Load client secrets from a local file.
    // CreateFileJson();
    fs_1.default.readFile(PATH_TO_CREDENTIALS, (err, content) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return console.log("Error loading client secret file:", err);
        // Authorize a client with credentials, then call the Google Drive API.
        //   console.log(JSON.parse(content));
        // authorize(JSON.parse(content), listFiles);
        Authorize(JSON.parse(content.toString()), uploadFile);
    }));
};
exports.Drive = Drive;
function Authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    //   console.log(oAuth2Client)
    // Check if we have previously stored a token.
    fs_1.default.readFile(TOKEN_PATH, (err, token) => {
        if (err)
            return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token.toString()));
        console.log("token: ", token);
        callback(oAuth2Client);
    });
}
function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    // console.log(rl)
    rl.question("Enter the code from that page here: ", (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err)
                return console.error("Error retrieving access token", err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs_1.default.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err)
                    return console.error(err);
                console.log("Token stored to", TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}
function listFiles(auth) {
    const drive = googleapis_1.google.drive({ version: "v3", auth });
    drive.files.list({
        pageSize: 10,
        fields: "nextPageToken, files(id, name)",
    }, (err, res) => {
        if (err)
            return console.log("The API returned an error: " + err);
        const files = res.data.files;
        if (files.length) {
            console.log("Files:");
            files.map((file) => {
                console.log(`${file.name} (${file.id})`);
            });
        }
        else {
            console.log("No files found.");
        }
    });
}
function CreateFileJson() {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield controller_1.GetListAll();
        console.log(data);
        if (data.length > 0) {
            fs_1.default.writeFileSync(path_1.default.resolve(`${__dirname}/../files/orders.json`), JSON.stringify(data));
        }
    });
}
exports.CreateFileJson = CreateFileJson;
// mongoexport  --uri="mongodb://127.0.0.1:27017" --collection=orders --db=personal --out=orders.json  --jsonArray
function uploadFile(auth) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Upload file");
        const drive = googleapis_1.google.drive({ version: "v3", auth });
        var resource = {
            name: "dataset orders of peronsal anho",
            // 'mimeType': 'application/vnd.google-apps.spreadsheet'
        };
        var media = {
            mimeType: "application/json",
            body: fs_1.default.createReadStream(path_1.default.resolve(`${__dirname}/../files/orders.json`)),
        };
        drive.files.create({
            requestBody: resource,
            media,
            fields: "id",
        }, function (err, file) {
            if (err) {
                // Handle error
                console.error(err);
            }
            else {
                console.log("File Id: ", file.id);
                // console.log("done")
            }
        });
    });
}
