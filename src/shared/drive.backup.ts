import fs from 'fs';
import readline from 'readline';
import { google } from 'googleapis'
import path from 'path';
import { GetListAll } from '@database/order/controller';

const PATH_TO_CREDENTIALS: string = path.resolve(`${__dirname}/../files/client_secret.json`);

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/drive"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = `${__dirname}/../files/token.json`;

export const Drive = () => {
    // Load client secrets from a local file.
    // CreateFileJson();
    fs.readFile(PATH_TO_CREDENTIALS, async (err, content) => {
        if (err) return console.log("Error loading client secret file:", err);
        // Authorize a client with credentials, then call the Google Drive API.
        //   console.log(JSON.parse(content));
        // authorize(JSON.parse(content), listFiles);
        Authorize(JSON.parse(content.toString()), uploadFile);
    });
};



function Authorize(credentials : any, callback : any) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    );

    //   console.log(oAuth2Client)

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token.toString()));
        console.log("token: ", token);
        callback(oAuth2Client);
    });
}

function getAccessToken(oAuth2Client : any, callback : any) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });

    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    // console.log(rl)
    rl.question("Enter the code from that page here: ", (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err : any, token : any) => {
            if (err) return console.error("Error retrieving access token", err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log("Token stored to", TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

function listFiles(auth : any) {
    const drive = google.drive({ version: "v3", auth });
    drive.files.list(
        {
            pageSize: 10,
            fields: "nextPageToken, files(id, name)",
        },
        (err : any, res : any) => {
            if (err) return console.log("The API returned an error: " + err);
            const files = res.data.files;
            if (files.length) {
                console.log("Files:");
                files.map((file : any) => {
                    console.log(`${file.name} (${file.id})`);
                });
            } else {
                console.log("No files found.");
            }
        }
    );
}

export async function CreateFileJson() {
    let data = await GetListAll();
    console.log(data)
    if (data.length > 0) {
        fs.writeFileSync(
            path.resolve(`${__dirname}/../files/orders.json`),
            JSON.stringify(data)
        );
    }
}

// mongoexport  --uri="mongodb://127.0.0.1:27017" --collection=orders --db=personal --out=orders.json  --jsonArray

async function uploadFile(auth : any) {
    console.log("Upload file")
    const drive = google.drive({ version: "v3", auth });

    var resource : any = {
        name: "dataset orders of peronsal anho",
        // 'mimeType': 'application/vnd.google-apps.spreadsheet'
    };
    var media : any = {
        mimeType: "application/json",
        body: fs.createReadStream(path.resolve(`${__dirname}/../files/orders.json`)),
    };

    drive.files.create(
        {
            requestBody: resource,
            media,
            fields: "id",
        },
        function (err : any, file : any) {
            if (err) {
                // Handle error
                console.error(err);
            } else {
                console.log("File Id: ", file.id);
                // console.log("done")
            }
        }
    );


}

