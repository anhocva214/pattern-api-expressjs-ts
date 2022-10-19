export class FileUpload {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    buffer: Buffer
    size: number
    constructor(obj: FileUpload) {
        this.fieldname= obj?.fieldname || "";
        this.originalname = obj?.originalname || "";
        this.encoding = obj?.encoding || "";
        this.mimetype = obj?.mimetype || "";
        this.buffer = obj?.buffer || "";
        this.size = obj?.size || 0
    }
}