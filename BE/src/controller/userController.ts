import UserService from "../services/userService";
import { Request, Response } from "express";

class UserController {
  private userServices;
  constructor() {
    this.userServices = UserService;
  }
  getAllUser = async (req: Request, res: Response) => {
    try {
      let users = await this.userServices.getAllUser();
      return res.status(200).json(users);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      let respond = await this.userServices.register(req.body);
      console.log(req.body);
      return res.status(201).json(respond);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };
  login = async (req: Request, res: Response) => {
    try {
      let respond = await this.userServices.login(req.body);
      return res.status(201).json(respond);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };
  getProfile = async (req: Request, res: Response) => {
    try {
      let respond = await this.userServices.getProfile(req.body.idUser);
      return res.status(201).json(respond);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };
}
export default new UserController();
