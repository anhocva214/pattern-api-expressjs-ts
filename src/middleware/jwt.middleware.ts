import { NextFunction, Request, Response } from "express";
import StatusCode from "http-status-codes";
const {UNAUTHORIZED} = StatusCode;


export default async function middleware(req: Request, res: Response, next: NextFunction) {
    let authorization : string = req.headers.authorization as string;
    let accessToken = authorization.split(" ")[1].trim();

    next()
}

