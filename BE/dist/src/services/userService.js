"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const user_1 = require("../model/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
class UserService {
    constructor() {
        this.getAllUser = async () => {
            let sql = `select * from user where role = 'user`;
            let users = await this.userRepository.query(sql);
            return users;
        };
        this.register = async (user) => {
            let checkUser = await this.userRepository.findOneBy({
                username: user.username,
            });
            if (checkUser) {
                return "Username already exists";
            }
            else {
                user.password = await bcrypt_1.default.hash(user.password, 10);
                return this.userRepository.save(user), "Register success";
            }
        };
        this.login = async (user) => {
            let checkUser = await this.userRepository.findOneBy({
                username: user.username,
            });
            if (!checkUser) {
                return "User not found";
            }
            else {
                let passwordCompare = await bcrypt_1.default.compare(user.password, checkUser.password);
                if (!passwordCompare) {
                    return "Wrong password";
                }
                else {
                    let payload = {
                        userId: checkUser.userId,
                        username: checkUser.username,
                        role: checkUser.role,
                    };
                    const token = jsonwebtoken_1.default.sign(payload, auth_1.SECRET, {
                        expiresIn: 3900000,
                    });
                    let userLogin = {
                        userId: checkUser.userId,
                        username: checkUser.username,
                        role: checkUser.role,
                        avatar: checkUser.avatar,
                        token: token,
                    };
                    return userLogin;
                }
            }
        };
        this.getProfile = async (userId) => {
            let user = await this.userRepository.findOneBy({ userId: userId });
            return user;
        };
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
    }
}
exports.default = new UserService();
//# sourceMappingURL=userService.js.map