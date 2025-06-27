"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const categoryModel_1 = __importDefault(require("./categoryModel"));
exports.CategoryService = {
    // 🟢 Create Category
    createCategory: async (data) => {
        return await categoryModel_1.default.create(data);
    },
    // 🔍 Get All Categories (With Pagination, Search & Parent Category Filter)
    getAllCategories: async (page, limit, search) => {
        const query = {};
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }
        const categories = await categoryModel_1.default.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });
        const totalCategories = await categoryModel_1.default.countDocuments(query);
        return { categories, page, limit, totalCategories, totalPages: Math.ceil(totalCategories / limit) };
    },
    // 📌 Get Category by ID
    getCategoryById: async (id) => {
        return await categoryModel_1.default.findById(id);
    },
    // 🔄 Update Category
    updateCategory: async (id, data) => {
        return await categoryModel_1.default.findByIdAndUpdate(id, data, { new: true });
    },
    // ❌ Delete Category
    deleteCategory: async (id) => {
        return await categoryModel_1.default.findByIdAndDelete(id);
    },
};
