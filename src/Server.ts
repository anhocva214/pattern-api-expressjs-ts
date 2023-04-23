import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import StatusCodes from "http-status-codes";
import "express-async-errors";

import { connectMongoDB } from "@config/db.config";
import { TLang } from "@resources/i18n/interface";
import { RoutersV1 } from "./routes/v1";
import { AppError } from "@models/error";
import logger from "@services/logger.service";
import { ENV } from "@helpers/env.helper";
import moment from "moment";

connectMongoDB()
  .then(() => logger.info("Connect database success"))
  .catch((err) => logger.error(err));

const app = express();
const { BAD_REQUEST } = StatusCodes;

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Security
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

declare module "express" {
  export interface Request {
    user?: any;
    tokenId?: string;
    payloadValidate?: any;
    lang?: TLang;
  }
}

// Handle accept language
function handleLanguage(req: Request, res: Response, next: NextFunction) {
  let lang = req.headers["accept-language"] as any;
  if (lang != "vi" && lang != "en") lang = "en";
  req.lang = lang;
  next();
}
app.use(handleLanguage);

const buildDate = moment().utc().add(7, "hours");
app.get("/", (req: Request, res: Response) => {
  const openDate = moment().utc().add(7, "hours");
  res.json({
    title: "APIs",
    env: ENV.NODE_ENV,
    version: "1.0",
    buildDate: buildDate.format("DD/MM/YYYY HH:mm:ss A"),
    fromNow: buildDate.from(openDate),
  });
});

// Add APIs
app.use("/v1", RoutersV1());

app.use(
  (err: AppError | any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
      logger.error(err);
      res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
      switch (err.constructor) {
        case AppError:
          err.translate(getLocaleFromRequest(req));
          delete err["level"];
          delete err["label"];
          res.json(err);
          break;
        default:
          res.json({ message: "System Error", detail: err.message });
          break;
      }
    }
    next();
  }
);

if (process.env.NODE_ENV == "production" || process.env.NODE_ENV == "testing") {
  app.use((req: Request, res: Response, next: NextFunction) => {
    let message = `${req.method} ${req.url} ${res.statusCode}`;
    if (res.statusCode < 400) {
      logger.info(message);
    } else {
      logger.error(message);
    }
    next();
  });
}

function getLocaleFromRequest(req: Request) {
  const locale = req.headers["accept-language"];
  if (locale === "en") return "en";
  return "vi";
}

// Export express instance
export default app;
