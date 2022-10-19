import { FileUpload } from "@models/upload.model";
import { GoogleDriveService } from "@services/google-drive.service";
import { NextFunction, Request, Response } from "express";
import multer from "multer";



export class UploadController {
    private googleDriveService: GoogleDriveService
    public upload: multer.Multer

    constructor(){
        this.upload = multer()
        this.googleDriveService = new GoogleDriveService()
    }

    async toDrive(req: Request, res: Response, next: NextFunction){
        const {files}: any = req
        let image = new FileUpload(files.image[0])
        await this.googleDriveService.uploadFile(image)
        res.json({})
    }
}