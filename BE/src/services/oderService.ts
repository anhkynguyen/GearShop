import { AppDataSource } from "../data-source";
import { Order } from "../model/order";

class OrderService {
  private orderRepository;
  constructor() {
    this.orderRepository = AppDataSource.getRepository(Order);
  }
  getAllOrder = async () => {
    let sql = `select * from order o join user u on o.userId = u.userId`;
    let orders = await this.orderRepository.query(sql);
    return orders;
  };

  getMyOrder = async (userId) => {
    let sql = `SELECT *
      FROM gear
      JOIN category ON gear.categoryId = category.categoryId
      JOIN \`order\` ON gear.gearId = \`order\`.gearId
      JOIN user ON \`order\`.userId = user.userId
      WHERE \`order\`.userId = ${userId} and  \`order\`.statusOrder = "Check"`;

    let orders = await this.orderRepository.query(sql);

    return orders;
  };
  save = async (order) => {
    return this.orderRepository.save(order);
  };
  findById = async (orderId) => {
    let orders = await this.orderRepository.findOneBy({ orderId: orderId });
    return orders;
  };
  findGearInOrder = async (gearId) => {
    let orders = await this.orderRepository.findOneBy({ gearId: gearId });
    return orders;
  };
  // updateOrder = async (orderId, newOrder) => {
  //   let orders = await this.orderRepository.findOneBy({ orderId: orderId });
  //   if (!orders) {
  //     return null;
  //   }
  //   return await this.orderRepository.update({ orderId: orderId }, newOrder);
  // };
  deleteOrder = async (orderId) => {
    console.log(orderId, 11112);

    let order = await this.orderRepository.findOneBy({ orderId: orderId });
    if (!order) {
      return null;
    }
    return this.orderRepository.delete({ orderId: orderId });
  };
  findOrderByUserId = async (userId) => {
    let orders = this.orderRepository.findOneBy({ userId: userId });
    return orders;
  };
  checkUser = async (userId, orderId) => {
    let checkUserId = await this.orderRepository.findOneBy({
      orderId: orderId,
    });
    if (checkUserId.userId === userId) {
      return true;
    }
    return false;
  };
  changeStatusOrder = async (id) => {
    let checkOrder = await this.orderRepository.findOneBy({ orderId: id });
    if (!checkOrder) {
      return null;
    } else {
      if (checkOrder.statusOrder === "Check") {
        checkOrder.statusOrder = "Checked";
        await this.orderRepository.save(checkOrder);
      }
    }
  };
}
export default new OrderService();
