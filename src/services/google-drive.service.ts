/**
 * Create a new google api service account
 * https://www.labnol.org/google-api-service-account-220404
 */

import path from 'path'
import { drive_v3, google } from 'googleapis'
import { Stream } from 'stream';
import { FileUpload } from '@models/upload.model';

export class GoogleDriveService {
    private KEYFILEPATH: string
    private SCOPES: string[]
    private drive: drive_v3.Drive

    constructor(){
        this.KEYFILEPATH = path.join(__dirname, 'key-gg-drive.json');
        this.SCOPES = ['https://www.googleapis.com/auth/drive'];

        const auth = new google.auth.GoogleAuth({
            keyFile: this.KEYFILEPATH,
            scopes: this.SCOPES,
        });
        this.drive = google.drive({ version: 'v3', auth });
    }

    async uploadFile(fileObject: FileUpload){
        const bufferStream = new Stream.PassThrough();
        bufferStream.end(fileObject.buffer);
        const { data } = await this.drive.files.create({
            media: {
                mimeType: fileObject.mimetype,
                body: bufferStream,
            },
            requestBody: {
                name: fileObject.originalname,
                parents: ['1lEXG478ofmbfPIU6HzisysetF9apwV1p'],
            },
            fields: 'id,name',
        });
        console.log(`Uploaded file ${data.name}`);
        console.log(`ID: ${data.id}`);
        console.log(`Url: https://drive.google.com/uc?export=view&id=${data.id}`);
    }
}
