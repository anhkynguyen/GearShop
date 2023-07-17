import orderDetailService from "../services/orderDetailService";
import userService from "../services/userService";
import { Request, Response } from "express";
import orderService from "../services/oderService";
import gearService from "../services/gearService";

class OrderDetailController {
  private orderDetailService;
  private gearService;
  private userService;
  private orderService;
  constructor() {
    this.orderDetailService = orderDetailService;
    this.userService = userService;
    this.orderService = orderService;
    this.gearService = gearService;
  }
  getAll = async (req: Request, res: Response) => {
    try {
      let userId = req["decoded"].userId;
      let orderDetails = await orderDetailService.getAllOrderDetail(userId);
      return res.status(200).json(orderDetails);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  // getOrderDetail = async (req: Request, res: Response) => {
  //   try {
  //     let orderDetails = await orderDetailService.getOrderDetail(
  //       req.params.idUser
  //     );
  //     return res.status(200).json(orderDetails);
  //   } catch (e) {
  //     res.status(500).json(e.message);
  //   }
  // };

  // getOrderDetailById = async (req: Request, res: Response) => {
  //   try {
  //     let orderDetails = await orderDetailService.getOrderDetailById(
  //       req.params.id
  //     );
  //     return res.status(200).json(orderDetails[0]);
  //   } catch (e) {
  //     res.status(500).json(e.message);
  //   }
  // };

  // getOrderDetailByGear = async (req: Request, res: Response) => {
  //   try {
  //     let orderDetails = await orderDetailService.getOrderDetailByGear(
  //       req.params.id
  //     );
  //     return res.status(200).json(orderDetails);
  //   } catch (e) {
  //     res.status(500).json(e.message);
  //   }
  // };

  createOrderDetail = async (req: Request, res: Response) => {
    try {
      let time = new Date().toLocaleDateString();
      let checkTime = time.split("/");
      let startTime = req.body.startTime.split("-");
      let endTime = req.body.endTime.split("-");
      if (+checkTime[2] > +startTime[0]) {
        return res.status(200).json("Wrong Start Time");
      } else if (
        +checkTime[2] === +startTime[0] &&
        +checkTime[0] > +startTime[1]
      ) {
        return res.status(200).json("Wrong Start Time");
      } else if (
        +checkTime[2] === +startTime[0] &&
        +checkTime[0] === +startTime[1] &&
        +checkTime[1] > +startTime[2]
      ) {
        return res.status(200).json("Wrong Start Time");
      } else {
        if (+startTime[0] > +endTime[0]) {
          return res.status(200).json("Wrong End Time");
        } else if (
          +startTime[0] === +endTime[0] &&
          +startTime[1] > +endTime[1]
        ) {
          return res.status(200).json("Wrong End Time");
        } else if (
          +startTime[0] === +endTime[0] &&
          +startTime[1] === +endTime[1] &&
          +startTime[2] >= +endTime[2]
        ) {
          return res.status(200).json("Wrong End Time");
        } else {
          let data = req.body;
          let orderId = req.body.orderId;
          let order = await orderService.changeStatusOrder(orderId);
          console.log(orderId, 1234);
          let price = gearService.getPrice(data.gearId);
          let time = +endTime[2] - +startTime[2];
          console.log(time, 1111);

          let total = (await price) * time;

          let orderDetail = await orderDetailService.save({ ...data, total });
          let gear = await gearService.changeStatusGear(req.body.gearId);

          return res.status(200).json(orderDetail);
        }
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  };

  // editOrderDetail = async (req: Request, res: Response) => {
  //   try {
  //     let idOrderDetail = +req.params.id;
  //     let newOrderDetail = req.body;
  //     let idUser = req["decoded"].idUser;
  //     let check = await this.orderDetailService.checkUser(
  //       idUser,
  //       idOrderDetail
  //     );
  //     let startTime = newOrderDetail.startTime.split("-");
  //     let endTime = newOrderDetail.endTime.split("-");
  //     if (check) {
  //       if (+startTime[0] > +endTime[0]) {
  //         return res.status(200).json("Wrong End Time");
  //       } else if (
  //         +startTime[0] === +endTime[0] &&
  //         +startTime[1] > +endTime[1]
  //       ) {
  //         return res.status(200).json("Wrong End Time");
  //       } else if (
  //         +startTime[0] === +endTime[0] &&
  //         +startTime[1] === +endTime[1] &&
  //         +startTime[2] >= +endTime[2]
  //       ) {
  //         return res.status(200).json("Wrong End Time");
  //       } else {
  //         let order = await this.orderDetailService.updateOrderDetail(
  //           idOrderDetail,
  //           newOrderDetail
  //         );
  //         return res.status(200).json(order);
  //       }
  //     } else {
  //       return res.status(401).json("invalid");
  //     }
  //   } catch (e) {
  //     res.status(500).json(e.message);
  //   }
  // };

  // cancelOrderDetail = async (req: Request, res: Response) => {
  //   try {
  //     let orderDetails = await orderDetailService.getOrderDetailById(
  //       req.params.id
  //     );
  //     let startTime = orderDetails[0].startTime.split("-");
  //     let endTime = orderDetails[0].endTime.split("-");
  //     if (
  //       +startTime[0] === +endTime[0] &&
  //       +startTime[1] === +endTime[1] &&
  //       +endTime[2] - +startTime[2] === 1
  //     ) {
  //       return res.status(200).json(`Wrong`);
  //     } else {
  //       await orderDetailService.cancelOrderDetail(req.params.id);
  //       let gear = await gearService.changeStatusGear(req.body.idHome);
  //       return res.status(200).json(`Success`);
  //     }
  //   } catch (e) {
  //     res.status(500).json(e.message);
  //   }
  // };

  // checkOut = async (req: Request, res: Response) => {
  //   try {
  //     let orderDetails = await orderDetailService.changeStatusOrder(
  //       req.params.id
  //     );
  //     let gear = await gearService.changeStatusGear(req.body.idHome);
  //     return res.status(200).json("Success");
  //   } catch (e) {
  //     res.status(500).json(e.message);
  //   }
  // };
}
export default new OrderDetailController();
