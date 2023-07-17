"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const order_1 = require("../model/order");
class OrderService {
    constructor() {
        this.getAllOrder = async () => {
            let sql = `select * from order o join user u on o.userId = u.userId`;
            let orders = await this.orderRepository.query(sql);
            return orders;
        };
        this.getMyOrder = async (userId) => {
            let sql = `SELECT *
      FROM gear
      JOIN category ON gear.categoryId = category.categoryId
      JOIN \`order\` ON gear.gearId = \`order\`.gearId
      JOIN user ON \`order\`.userId = user.userId
      WHERE \`order\`.userId = ${userId} and  \`order\`.statusOrder = "Check"`;
            let orders = await this.orderRepository.query(sql);
            return orders;
        };
        this.save = async (order) => {
            return this.orderRepository.save(order);
        };
        this.findById = async (orderId) => {
            let orders = await this.orderRepository.findOneBy({ orderId: orderId });
            return orders;
        };
        this.findGearInOrder = async (gearId) => {
            let orders = await this.orderRepository.findOneBy({ gearId: gearId });
            return orders;
        };
        this.deleteOrder = async (orderId) => {
            console.log(orderId, 11112);
            let order = await this.orderRepository.findOneBy({ orderId: orderId });
            if (!order) {
                return null;
            }
            return this.orderRepository.delete({ orderId: orderId });
        };
        this.findOrderByUserId = async (userId) => {
            let orders = this.orderRepository.findOneBy({ userId: userId });
            return orders;
        };
        this.checkUser = async (userId, orderId) => {
            let checkUserId = await this.orderRepository.findOneBy({
                orderId: orderId,
            });
            if (checkUserId.userId === userId) {
                return true;
            }
            return false;
        };
        this.changeStatusOrder = async (id) => {
            let checkOrder = await this.orderRepository.findOneBy({ orderId: id });
            if (!checkOrder) {
                return null;
            }
            else {
                if (checkOrder.statusOrder === "Check") {
                    checkOrder.statusOrder = "Checked";
                    await this.orderRepository.save(checkOrder);
                }
            }
        };
        this.orderRepository = data_source_1.AppDataSource.getRepository(order_1.Order);
    }
}
exports.default = new OrderService();
//# sourceMappingURL=oderService.js.map