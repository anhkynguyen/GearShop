"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderDetailService_1 = __importDefault(require("../services/orderDetailService"));
const userService_1 = __importDefault(require("../services/userService"));
const oderService_1 = __importDefault(require("../services/oderService"));
const gearService_1 = __importDefault(require("../services/gearService"));
class OrderDetailController {
    constructor() {
        this.getAll = async (req, res) => {
            try {
                let userId = req["decoded"].userId;
                let orderDetails = await orderDetailService_1.default.getAllOrderDetail(userId);
                return res.status(200).json(orderDetails);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.createOrderDetail = async (req, res) => {
            try {
                let time = new Date().toLocaleDateString();
                let checkTime = time.split("/");
                let startTime = req.body.startTime.split("-");
                let endTime = req.body.endTime.split("-");
                if (+checkTime[2] > +startTime[0]) {
                    return res.status(200).json("Wrong Start Time");
                }
                else if (+checkTime[2] === +startTime[0] &&
                    +checkTime[0] > +startTime[1]) {
                    return res.status(200).json("Wrong Start Time");
                }
                else if (+checkTime[2] === +startTime[0] &&
                    +checkTime[0] === +startTime[1] &&
                    +checkTime[1] > +startTime[2]) {
                    return res.status(200).json("Wrong Start Time");
                }
                else {
                    if (+startTime[0] > +endTime[0]) {
                        return res.status(200).json("Wrong End Time");
                    }
                    else if (+startTime[0] === +endTime[0] &&
                        +startTime[1] > +endTime[1]) {
                        return res.status(200).json("Wrong End Time");
                    }
                    else if (+startTime[0] === +endTime[0] &&
                        +startTime[1] === +endTime[1] &&
                        +startTime[2] >= +endTime[2]) {
                        return res.status(200).json("Wrong End Time");
                    }
                    else {
                        let data = req.body;
                        let orderId = req.body.orderId;
                        let order = await oderService_1.default.changeStatusOrder(orderId);
                        console.log(orderId, 1234);
                        let price = gearService_1.default.getPrice(data.gearId);
                        let time = +endTime[2] - +startTime[2];
                        console.log(time, 1111);
                        let total = (await price) * time;
                        let orderDetail = await orderDetailService_1.default.save(Object.assign(Object.assign({}, data), { total }));
                        let gear = await gearService_1.default.changeStatusGear(req.body.gearId);
                        return res.status(200).json(orderDetail);
                    }
                }
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.orderDetailService = orderDetailService_1.default;
        this.userService = userService_1.default;
        this.orderService = oderService_1.default;
        this.gearService = gearService_1.default;
    }
}
exports.default = new OrderDetailController();
//# sourceMappingURL=orderDetailController.js.map