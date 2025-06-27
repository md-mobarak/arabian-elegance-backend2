"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const productModel_1 = __importDefault(require("./productModel"));
const createProduct = async (data) => {
    return await productModel_1.default.create(data);
};
exports.createProduct = createProduct;
const getProducts = async (search, category, minPrice, maxPrice, page = 1, limit = 10) => {
    let query = {};
    if (search)
        query.title = { $regex: search, $options: "i" };
    if (category)
        query.category = category;
    if (minPrice !== undefined || maxPrice !== undefined) {
        query.price = {};
        if (minPrice !== undefined)
            query.price.$gte = minPrice;
        if (maxPrice !== undefined)
            query.price.$lte = maxPrice;
    }
    const products = await productModel_1.default.find(query)
        .populate('category')
        .skip((page - 1) * limit)
        .limit(limit).sort({ createdAt: -1 });
    const total = await productModel_1.default.countDocuments(query);
    return { products, total, totalPages: Math.ceil(total / limit) };
};
exports.getProducts = getProducts;
const getProductById = async (id) => {
    return await productModel_1.default.findById(id);
};
exports.getProductById = getProductById;
const updateProduct = async (id, data) => {
    return await productModel_1.default.findByIdAndUpdate(id, data, { new: true });
};
exports.updateProduct = updateProduct;
const deleteProduct = async (id) => {
    return await productModel_1.default.findByIdAndDelete(id);
};
exports.deleteProduct = deleteProduct;
