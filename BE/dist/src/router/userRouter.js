"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userController_1 = __importDefault(require("../controller/userController"));
const auth_1 = require("../middleware/auth");
const userAuth_1 = require("../middleware/userAuth");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/register", userController_1.default.register);
exports.userRouter.post("/login", userController_1.default.login);
exports.userRouter.use(auth_1.auth);
exports.userRouter.get("/profile", userAuth_1.userAuth, userController_1.default.getProfile);
//# sourceMappingURL=userRouter.js.map