"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.productControllers = exports.createProduct = void 0;
const productService = __importStar(require("./productService"));
const createProduct = async (req, res, next) => {
    try {
        const { title, description, category, price, stock, brand, sizes, colors, tags, images } = req.body;
        const productData = {
            title,
            description,
            category,
            price,
            stock,
            brand,
            sizes,
            colors,
            tags,
            images
        };
        const product = await productService.createProduct(productData);
        res.status(201).json({ success: true, message: "Product created", data: product });
        // console.log(product);
    }
    catch (error) {
        next(error);
    }
};
exports.createProduct = createProduct;
const getProducts = async (req, res, next) => {
    try {
        const { search, category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
        const min = minPrice && !isNaN(Number(minPrice)) ? Number(minPrice) : undefined;
        const max = maxPrice && !isNaN(Number(maxPrice)) ? Number(maxPrice) : undefined;
        const result = await productService.getProducts(search, category, min, max, Number(page) || 1, Number(limit) || 10);
        res.status(200).json({ success: true, ...result });
    }
    catch (error) {
        next(error);
    }
};
// Get single product
const getProductById = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            res.status(404).json({ success: false, message: "Product not found" });
            return;
        }
        res.status(200).json({ success: true, data: product });
    }
    catch (error) {
        next(error);
    }
};
// Update product (Admin, Manager)
const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body);
        if (!updatedProduct) {
            res.status(404).json({ success: false, message: "Product not found" });
            return;
        }
        res.status(200).json({ success: true, message: "Product updated", data: updatedProduct });
    }
    catch (error) {
        next(error);
    }
};
// Delete product (Admin only)
const deleteProduct = async (req, res, next) => {
    try {
        const deletedProduct = await productService.deleteProduct(req.params.id);
        if (!deletedProduct) {
            res.status(404).json({ success: false, message: "Product not found" });
            return;
        }
        res.status(200).json({ success: true, message: "Product deleted" });
    }
    catch (error) {
        next(error);
    }
};
exports.productControllers = {
    createProduct: exports.createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
