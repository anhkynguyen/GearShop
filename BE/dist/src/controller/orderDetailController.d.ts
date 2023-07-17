import { Request, Response } from "express";
declare class OrderDetailController {
    private orderDetailService;
    private gearService;
    private userService;
    private orderService;
    constructor();
    getAll: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    createOrderDetail: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: OrderDetailController;
export default _default;
