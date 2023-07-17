"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const orderDetail_1 = require("../model/orderDetail");
class OrderDetailService {
    constructor() {
        this.getAllOrderDetail = async (userId) => {
            let sql = `SELECT * FROM order_detail
               JOIN \`order\` ON order_detail.orderId = \`order\`.orderId
               JOIN \`gear\` ON order.gearId = \`gear\`.gearId
               WHERE \`order\`.userId = ?`;
            let orderDetails = await this.orderDetailRepository.query(sql, [userId]);
            return orderDetails;
        };
        this.save = async (orderDetail) => {
            console.log(orderDetail, 5555);
            return await this.orderDetailRepository.save(orderDetail);
        };
        this.orderDetailRepository = data_source_1.AppDataSource.getRepository(orderDetail_1.OrderDetail);
    }
}
exports.default = new OrderDetailService();
//# sourceMappingURL=orderDetailService.js.map