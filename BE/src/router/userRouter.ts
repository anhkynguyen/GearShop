import { Router } from "express";

import UserController from "../controller/userController";
import { auth } from "../middleware/auth";
import { userAuth } from "../middleware/userAuth";

export const userRouter = Router();
userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.use(auth);
userRouter.get("/profile", userAuth, UserController.getProfile);
