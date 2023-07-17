declare class CategoryService {
    private categoryRepository;
    constructor();
    getAllCategory: () => Promise<any>;
    addCategory: (category: any) => Promise<any>;
    findCategoryById: (categoryId: any) => Promise<any>;
    updateCategory: (categoryId: any, newCategory: any) => Promise<any>;
    deleteCategory: (categoryId: any) => Promise<any>;
}
declare const _default: CategoryService;
export default _default;
