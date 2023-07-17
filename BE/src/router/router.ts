import { Router } from "express";

import { userRouter } from "./userRouter";
import { gearRouter } from "./gearRouter";
import { orderRouter } from "./orderRouter";
import { categoriesRouter } from "./categoryRouter";
import { orderDetailRouter } from "./orderDetailRouter";

export const router = Router();
router.use("/orderDetails", orderDetailRouter);
router.use("/users", userRouter);
router.use("/gears", gearRouter);
router.use("/orders", orderRouter);
router.use("/categories", categoriesRouter);
