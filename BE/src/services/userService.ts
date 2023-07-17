import { AppDataSource } from "../data-source";
import { User } from "../model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../middleware/auth";

class UserService {
  private userRepository;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }
  getAllUser = async () => {
    let sql = `select * from user where role = 'user`;
    let users = await this.userRepository.query(sql);
    return users;
  };
  register = async (user) => {
    let checkUser = await this.userRepository.findOneBy({
      username: user.username,
    });
    if (checkUser) {
      return "Username already exists";
    } else {
      user.password = await bcrypt.hash(user.password, 10);
      return this.userRepository.save(user), "Register success";
    }
  };
  login = async (user) => {
    let checkUser = await this.userRepository.findOneBy({
      username: user.username,
    });

    if (!checkUser) {
      return "User not found";
    } else {
      let passwordCompare = await bcrypt.compare(
        user.password,
        checkUser.password
      );
      if (!passwordCompare) {
        return "Wrong password";
      } else {
        let payload = {
          userId: checkUser.userId,
          username: checkUser.username,
          role: checkUser.role,
        };

        const token = jwt.sign(payload, SECRET, {
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
  getProfile = async (userId) => {
    let user = await this.userRepository.findOneBy({ userId: userId });
    return user;
  };
}
export default new UserService();
