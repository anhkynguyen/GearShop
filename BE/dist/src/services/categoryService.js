"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../model/category");
const data_source_1 = require("../data-source");
class CategoryService {
    constructor() {
        this.getAllCategory = async () => {
            let sql = `select * from category`;
            let categories = await this.categoryRepository.query(sql);
            if (!categories) {
                return "Not Found";
            }
            return categories;
        };
        this.addCategory = async (category) => {
            return this.categoryRepository.save(category);
        };
        this.findCategoryById = async (categoryId) => {
            let category = await this.categoryRepository.findOneBy({
                categoryId: categoryId,
            });
            if (!category) {
                return "Not Found";
            }
            return category;
        };
        this.updateCategory = async (categoryId, newCategory) => {
            let category = this.findCategoryById(categoryId);
            if (!category) {
                return "Not Found";
            }
            return this.categoryRepository.update({ categoryId: categoryId }, newCategory);
        };
        this.deleteCategory = async (categoryId) => {
            let category = this.findCategoryById(categoryId);
            if (!category) {
                return "Not Found";
            }
            return this.categoryRepository.delete({ categoryId: categoryId });
        };
        this.categoryRepository = data_source_1.AppDataSource.getRepository(category_1.Category);
    }
}
exports.default = new CategoryService();
//# sourceMappingURL=categoryService.js.map