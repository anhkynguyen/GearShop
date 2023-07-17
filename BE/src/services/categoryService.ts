import { Category } from "../model/category";
import { AppDataSource } from "../data-source";

class CategoryService {
  private categoryRepository;
  constructor() {
    this.categoryRepository = AppDataSource.getRepository(Category);
  }
  getAllCategory = async () => {
    let sql = `select * from category`;
    let categories = await this.categoryRepository.query(sql);
    if (!categories) {
      return "Not Found";
    }
    return categories;
  };
  addCategory = async (category) => {
    return this.categoryRepository.save(category);
  };
  findCategoryById = async (categoryId) => {
    let category = await this.categoryRepository.findOneBy({
      categoryId: categoryId,
    });
    if (!category) {
      return "Not Found";
    }
    return category;
  };
  updateCategory = async (categoryId, newCategory) => {
    let category = this.findCategoryById(categoryId);
    if (!category) {
      return "Not Found";
    }
    return this.categoryRepository.update(
      { categoryId: categoryId },
      newCategory
    );
  };
  deleteCategory = async (categoryId) => {
    let category = this.findCategoryById(categoryId);
    if (!category) {
      return "Not Found";
    }
    return this.categoryRepository.delete({ categoryId: categoryId });
  };
  //   checkUser = async (userId, categoryId) => {
  //     let checkIdUser = await this.categoryRepository.findOneBy({
  //       categoryId: categoryId,
  //     });
  //     if (checkIdUser.userId === userId) {
  //       return true;
  //     }
  //     return false;
  //   };
}
export default new CategoryService();
