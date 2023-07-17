import { Request, Response } from "express";
declare class CategoryController {
    private categoryService;
    constructor();
    getAllCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: CategoryController;
export default _default;
