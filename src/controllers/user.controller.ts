import StatusCodes from "http-status-codes";
import { NextFunction, Request, Response } from "express";
const { FORBIDDEN, CREATED, OK, BAD_GATEWAY, BAD_REQUEST } = StatusCodes;
import { User } from "@models/user.model";
import { Token } from "@models/token.model";
import bcrypt from "bcrypt";
import JwtService from "@services/jwt.service";
import { AppError } from "@models/error";
import moment from "moment";

export default class UserController {
  private jwtService: JwtService;
  private LOGIN_EXPIRES_IN: number;

  constructor() {
    this.jwtService = new JwtService();
    this.LOGIN_EXPIRES_IN = 60 * 60 * 8;
  }

  // Register new user
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      let user = new User(req.body);
      user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
      user.role = "user";
      await User.create(user.dataValues);
      res.json({});
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  // Login
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      let { username, password } = req.body;
      let user = await User.findOne({ where: { username } });
      // console.log(user)
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new AppError({
          where: "login",
          message: "login_failure",
          statusCode: StatusCodes.UNAUTHORIZED,
          detail: null,
        });
      }

      let token = new Token();
      token.moduleId = user?.id || "";
      token.preCreate();
      token.payload = this.jwtService.login(user, this.LOGIN_EXPIRES_IN);
      token.expiredAt = moment(token.createdAt)
        .add(this.LOGIN_EXPIRES_IN, "seconds")
        .toDate();

      await Token.create(token.dataValues);

      res.json({
        user: { ...user.dataValues, password: undefined },
        token: {
          accessToken: token.payload,
          expiredAt: token.expiredAt,
        },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  // logout
  async logout(req: Request, res: Response) {
    await Token.destroy({
      where: {
        moduleId: req.user.id,
        id: req.tokenId,
      },
    });
    return res.json({});
  }

  // check access token
  async authenticate(req: Request, res: Response) {
    return res.status(OK).send(req.user);
  }

  // update info
  async update(req: Request, res: Response) {
    let user = new User(req.user);
    let payload = req.body;
    await User.update({ ...payload }, { where: { id: user.id } });
    return res.json({});
  }

  // remove
  async remove(req: Request, res: Response) {
    let {userId} = req.params;
    await User.destroy({ where: { id: userId } });
    return res.json({});
  }

  // get my info
  async myInfo(req: Request, res: Response) {
    let user = new User(req.user);
    return res.status(200).send(user);
  }

  // get all users
  async getAll(req: Request, res: Response) {
    let users = await User.findAll();
    return res.status(200).send(users);
  }
}
