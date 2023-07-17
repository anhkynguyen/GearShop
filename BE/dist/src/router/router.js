"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const userRouter_1 = require("./userRouter");
const gearRouter_1 = require("./gearRouter");
const orderRouter_1 = require("./orderRouter");
const categoryRouter_1 = require("./categoryRouter");
const orderDetailRouter_1 = require("./orderDetailRouter");
exports.router = (0, express_1.Router)();
exports.router.use("/orderDetails", orderDetailRouter_1.orderDetailRouter);
exports.router.use("/users", userRouter_1.userRouter);
exports.router.use("/gears", gearRouter_1.gearRouter);
exports.router.use("/orders", orderRouter_1.orderRouter);
exports.router.use("/categories", categoryRouter_1.categoriesRouter);
//# sourceMappingURL=router.js.map