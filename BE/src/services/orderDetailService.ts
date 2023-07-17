import { AppDataSource } from "../data-source";
import { OrderDetail } from "../model/orderDetail";

class OrderDetailService {
  private orderDetailRepository;
  constructor() {
    this.orderDetailRepository = AppDataSource.getRepository(OrderDetail);
  }
  getAllOrderDetail = async (userId) => {
    let sql = `SELECT * FROM order_detail
               JOIN \`order\` ON order_detail.orderId = \`order\`.orderId
               JOIN \`gear\` ON order.gearId = \`gear\`.gearId
               WHERE \`order\`.userId = ?`;

    let orderDetails = await this.orderDetailRepository.query(sql, [userId]);
    return orderDetails;
  };
  // getOrderDetail = async (userId) => {
  //   let sql = `select * from gear
  //                           join category c on 	gear.categoryId = c.categoryId
  //                           join orderDetail od on gear.gearId = od.gearId
  //                           join order1 o on od.orderId = o.orderId where o.userId = ${userId};`;
  //   let orderDetails = await this.orderDetailRepository.query(sql);
  //   return orderDetails;
  // };

  // getOrderDetailById = async (id) => {
  //   let sql = `select * from gear
  //                           join category c on 	gear.categoryId = c.categoryId
  //                           join orderDetail od on gear.gearId = od.gearId
  //                           join order1 o on od.orderId = o.orderId where od.orderDetailId = ${id};`;
  //   let orderDetails = await this.orderDetailRepository.query(sql);
  //   return orderDetails;
  // };

  // getOrderDetailByGear = async (id) => {
  //   let sql = `select * from orderDetail od
  //                           join order1 o on od.orderId = o.orderId
  //                           join user u on o.userId = u.userId where od.gearId = ${id};`;
  //   let orderDetails = await this.orderDetailRepository.query(sql);
  //   return orderDetails;
  // };

  save = async (orderDetail) => {
    console.log(orderDetail, 5555);

    return await this.orderDetailRepository.save(orderDetail);
  };
  // updateOrderDetail = async (id, newOrderDetail) => {
  //   let order = await this.orderDetailRepository.findOneBy({
  //     orderDetailId: id,
  //   });
  //   if (!order) {
  //     return null;
  //   }
  //   return await this.orderDetailRepository.update(
  //     { orderDetailId: id },
  //     newOrderDetail
  //   );
  // };
  // cancelOrderDetail = async (orderDetailId) => {
  //   let orderDetail = await this.orderDetailRepository.findOneBy({
  //     orderDetailId: orderDetailId,
  //   });
  //   if (!orderDetail) {
  //     return null;
  //   }
  //   orderDetail.statusOrder = "Cancel";
  //   return this.orderDetailRepository.update(
  //     { orderDetailId: orderDetailId },
  //     orderDetail
  //   );
  // };
  // checkUser = async (userId, orderDetailId) => {
  //   let sql = `select * from orderDetail od
  //                       join order1 o on od.orderId = o.orderId
  //                       join user u on o.userId = u.userId where od.orderDetailId = ${orderDetailId};`;
  //   let checkUserId = await this.orderDetailRepository.query(sql);
  //   if (checkUserId[0].userId === userId) {
  //     return true;
  //   }
  //   return false;
  // };
  // changeStatusOrder = async (orderDetailId) => {
  //   let orderDetail = await this.orderDetailRepository.findOneBy({
  //     orderDetailId: orderDetailId,
  //   });
  //   if (!orderDetail) {
  //     return null;
  //   }
  //   orderDetail.statusOrder = "Check Out";
  //   return await this.orderDetailRepository.update(
  //     { orderDetailId: orderDetailId },
  //     orderDetail
  //   );
  // };
}
export default new OrderDetailService();
