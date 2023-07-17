import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import orderService from "../services/oderService";
import userService from "../services/userService";
class OrderController {
  private orderService;
  private userService;
  constructor() {
    this.orderService = orderService;
    this.userService = userService;
  }
  getAll = async (req: Request, res: Response) => {
    try {
      let orders = await orderService.getMyOrder(req["decoded"].userId);
      return res.status(200).json(orders);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };
  createOrder = async (req: Request, res: Response) => {
    try {
      let gearId = req.body.gearId;
      let order = await orderService.findGearInOrder(gearId);
      if (order) {
        return res.status(200).json("Already Exists");
      } else {
        let data = req.body;
        let order = await orderService.save(data);
        return res.status(200).json(order);
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  };
  // findByIdOrder = async (req: Request, res: Response) => {
  //   try {
  //     let orderId = req.params.orderId;
  //     let order = await orderService.findById(orderId);
  //     return res.status(200).json(order);
  //   } catch (e) {
  //     res.status(500).json(e.message);
  //   }
  // };
  // editOrder = async (req: Request, res: Response) => {
  //   try {
  //     let orderId = req.params.orderId;
  //     let newOrder = req.body;
  //     let userId = req["decoded"].userId;
  //     let check = await this.orderService.checkUser(userId, orderId);
  //     if (check) {
  //       let order = await this.orderService.updateOrder(orderId, newOrder);
  //       return res.status(200).json(order);
  //     } else {
  //       return res.status(401).json("invalid");
  //     }
  //   } catch (e) {
  //     res.status(500).json(e.message);
  //   }
  // };

  deleteOrder = async (req: Request, res: Response) => {
    try {
      let orderId = req.params.orderId;
      console.log(req.params, 5555);

      let orders = await orderService.deleteOrder(orderId);
      return res.status(200).json(orders);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };
  showOrderByUserId = async (req: Request, res: Response) => {
    try {
      let orders = await this.orderService.findOrderByUserId(req.params.userId);
      return res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };
}
export default new OrderController();
