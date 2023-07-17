import categoryService from "../services/categoryService";
import { Request, Response } from "express";

class CategoryController {
  private categoryService;
  constructor() {
    this.categoryService = categoryService;
  }
  getAllCategory = async (req: Request, res: Response) => {
    let gears = await categoryService.getAllCategory();
    return res.status(200).json(gears);
  };
}
export default new CategoryController();
