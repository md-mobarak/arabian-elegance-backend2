import Category from "./categoryModel";
import { ICategory } from "../../interfaces/ICategory";

export const CategoryService = {
  // 🟢 Create Category
  createCategory: async (data: ICategory) => {
    return await Category.create(data);
  },


// 🔍 Get All Categories (With Pagination, Search & Parent Category Filter)
getAllCategories: async (page: number, limit: number, search?: string, ) => {
    const query: any = {};
  
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
  
  
  
    const categories = await Category.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
  
    const totalCategories = await Category.countDocuments(query);
  
    return { categories, page, limit, totalCategories, totalPages: Math.ceil(totalCategories / limit) };
  },
  
  // 📌 Get Category by ID
  getCategoryById: async (id: string) => {
    return await Category.findById(id);
  },

  // 🔄 Update Category
  updateCategory: async (id: string, data: Partial<ICategory>) => {
    return await Category.findByIdAndUpdate(id, data, { new: true });
  },

  // ❌ Delete Category
  deleteCategory: async (id: string) => {
    return await Category.findByIdAndDelete(id);
  },
};
