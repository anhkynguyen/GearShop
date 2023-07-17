import { Router } from "express";
import categoryController from "../controller/categoryController";
import { auth } from "../middleware/auth";
export const categoriesRouter = Router();
categoriesRouter.use(auth);
categoriesRouter.get("", categoryController.getAllCategory);
