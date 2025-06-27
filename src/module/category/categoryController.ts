import { Request, Response, NextFunction } from "express";
import { CategoryService } from "./categoryService";
// import * as categoryService from "./categoryService";

// Create a new category
const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const category = await CategoryService.createCategory(req.body);
    // console.log(category);
    res.status(201).json({ success: true, message: "Category created successfully", data: category });
  // console.log(category)
  } catch (error) {
    next(error);
  }
};

// Get all categories with search, filter, and pagination
const getAllCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page = 1, limit = 10, search} = req.query;
      const result = await CategoryService.getAllCategories(
        Number(page),
        Number(limit),
        search as string,
      );
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };
  

// Get single category by ID
const getCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const category = await CategoryService.getCategoryById(req.params.id);
    if (!category) {
      res.status(404).json({ success: false, message: "Category not found" });
      return;
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

// Update category
const updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updatedCategory = await CategoryService.updateCategory(req.params.id, req.body);
    if (!updatedCategory) {
      res.status(404).json({ success: false, message: "Category not found" });
      return;
    }
    res.status(200).json({ success: true, message: "Category updated", data: updatedCategory });
  } catch (error) {
    next(error);
  }
};

// Delete category
const deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deletedCategory = await CategoryService.deleteCategory(req.params.id);
    if (!deletedCategory) {
      res.status(404).json({ success: false, message: "Category not found" });
      return;
    }
    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    next(error);
  }
};

export const CategoryController = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};