import { Request, Response } from "express";
declare class OrderController {
    private orderService;
    private userService;
    constructor();
    getAll: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    createOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    showOrderByUserId: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: OrderController;
export default _default;
