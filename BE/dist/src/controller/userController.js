"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../services/userService"));
class UserController {
    constructor() {
        this.getAllUser = async (req, res) => {
            try {
                let users = await this.userServices.getAllUser();
                return res.status(200).json(users);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.register = async (req, res) => {
            try {
                let respond = await this.userServices.register(req.body);
                console.log(req.body);
                return res.status(201).json(respond);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.login = async (req, res) => {
            try {
                let respond = await this.userServices.login(req.body);
                return res.status(201).json(respond);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.getProfile = async (req, res) => {
            try {
                let respond = await this.userServices.getProfile(req.body.idUser);
                return res.status(201).json(respond);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.userServices = userService_1.default;
    }
}
exports.default = new UserController();
//# sourceMappingURL=userController.js.map