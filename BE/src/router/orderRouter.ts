import { Router } from "express";
import orderController from "../controller/orderController";
import { auth } from "../middleware/auth";
import { userAuth } from "../middleware/userAuth";

export const orderRouter = Router();
orderRouter.use(auth);
orderRouter.get("", orderController.getAll);
orderRouter.post("", orderController.createOrder);
// orderRouter.put("/:idOrder", orderController.editOrder);
orderRouter.delete("/:orderId", orderController.deleteOrder);
// orderRouter.get("/find-order/:idOrder", orderController.findByIdOrder);
orderRouter.get("/my-order/:idUser", orderController.showOrderByUserId);
