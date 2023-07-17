"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oderService_1 = __importDefault(require("../services/oderService"));
const userService_1 = __importDefault(require("../services/userService"));
class OrderController {
    constructor() {
        this.getAll = async (req, res) => {
            try {
                let orders = await oderService_1.default.getMyOrder(req["decoded"].userId);
                return res.status(200).json(orders);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.createOrder = async (req, res) => {
            try {
                let gearId = req.body.gearId;
                let order = await oderService_1.default.findGearInOrder(gearId);
                if (order) {
                    return res.status(200).json("Already Exists");
                }
                else {
                    let data = req.body;
                    let order = await oderService_1.default.save(data);
                    return res.status(200).json(order);
                }
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.deleteOrder = async (req, res) => {
            try {
                let orderId = req.params.orderId;
                console.log(req.params, 5555);
                let orders = await oderService_1.default.deleteOrder(orderId);
                return res.status(200).json(orders);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.showOrderByUserId = async (req, res) => {
            try {
                let orders = await this.orderService.findOrderByUserId(req.params.userId);
                return res.status(200).json(orders);
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.orderService = oderService_1.default;
        this.userService = userService_1.default;
    }
}
exports.default = new OrderController();
//# sourceMappingURL=orderController.js.map