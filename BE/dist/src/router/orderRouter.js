"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const orderController_1 = __importDefault(require("../controller/orderController"));
const auth_1 = require("../middleware/auth");
exports.orderRouter = (0, express_1.Router)();
exports.orderRouter.use(auth_1.auth);
exports.orderRouter.get("", orderController_1.default.getAll);
exports.orderRouter.post("", orderController_1.default.createOrder);
exports.orderRouter.delete("/:orderId", orderController_1.default.deleteOrder);
exports.orderRouter.get("/my-order/:idUser", orderController_1.default.showOrderByUserId);
//# sourceMappingURL=orderRouter.js.map