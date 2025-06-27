
import { Request, Response, NextFunction } from "express";
import * as productService from "./productService";
import cloudinary from 'cloudinary';
import { IProduct } from "../../interfaces/IProduct";
import Product from "./productModel";
// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



// export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const { title, description, category, price, stock, brand, sizes, colors, tags,images } = req.body;

//     const productData = {
//       title,
//       description,
//       category,
//       price,
//       stock,
//       brand,
//       sizes,
//       colors,
//       tags,
//       images
//     };

//     const product = await productService.createProduct(productData);
//     res.status(201).json({ success: true, message: "Product created", data: product });
//     // console.log(product);
//   } catch (error) {
//     next(error);
//   }
// };

export const createProduct = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get text fields from request body
    const { title, description, category, price, stock, brand, sizes, colors, tags } = req.body;

    // Handle image uploads
    if (!req.files || !req.files.images) {
      throw new Error('No images uploaded');
    }

    // Process multiple images
    const files = Array.isArray(req.files.images) 
      ? req.files.images 
      : [req.files.images];

    const imageUrls: string[] = [];
    for (const file of files) {
      const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: 'ecommerce-products',
      });
      imageUrls.push(result.secure_url);
    }

    // Create product data
    const productData: Partial<IProduct> = {
      title,
      description,
      category,
      price: Number(price),
      stock: Number(stock),
      brand,
      sizes: JSON.parse(sizes),
      colors: JSON.parse(colors),
      tags: JSON.parse(tags),
      images: imageUrls,
    };

    const product = await Product.create(productData);
    
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error:any) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};


const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { search, category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

    const min = minPrice && !isNaN(Number(minPrice)) ? Number(minPrice) : undefined;
    const max = maxPrice && !isNaN(Number(maxPrice)) ? Number(maxPrice) : undefined;

    const result = await productService.getProducts(
      search as string,
      category as string,
      min,
      max,
      Number(page) || 1,
      Number(limit) || 10
    );

    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};


// Get single product
const getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// Update product (Admin, Manager)
// const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const updatedProduct = await productService.updateProduct(req.params.id, req.body);
//     if (!updatedProduct) {
//       res.status(404).json({ success: false, message: "Product not found" });
//       return;
//     }
//     res.status(200).json({ success: true, message: "Product updated", data: updatedProduct });
//   } catch (error) {
//     next(error);
//   }
// };

// Delete product (Admin only)
// const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const deletedProduct = await productService.deleteProduct(req.params.id);
//     if (!deletedProduct) {
//       res.status(404).json({ success: false, message: "Product not found" });
//       return;
//     }
//     res.status(200).json({ success: true, message: "Product deleted" });
//   } catch (error) {
//     next(error);
//   }
// };



export const updateProduct = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    let imageUrls:any = [];

    // Handle new image uploads
    if (req.files && req.files.images) {
      const files = Array.isArray(req.files.images) 
        ? req.files.images 
        : [req.files.images];
      
      for (const file of files) {
        const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
          folder: 'ecommerce-products',
        });
        imageUrls.push(result.secure_url);
      }
    }

    // Merge existing and new images
    if (imageUrls.length > 0) {
      const existingProduct:any = await Product.findById(id);
      imageUrls = [...existingProduct.images, ...imageUrls];
    }

    // Prepare update data
    const updateData = {
      ...req.body,
      ...(imageUrls.length > 0 && { images: imageUrls }),
      price: Number(req.body.price),
      stock: Number(req.body.stock),
      sizes: JSON.parse(req.body.sizes),
      colors: req.body.colors.split(',').map((c: string) => c.trim()),
      tags: req.body.tags.split(',').map((t: string) => t.trim()),
    };

    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteProduct = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    
    // Delete from Cloudinary
    const product:any = await Product.findById(id);
    for (const imageUrl of product.images) {
      const publicId = imageUrl.split('/').pop().split('.')[0];
      await cloudinary.v2.uploader.destroy(`ecommerce-products/${publicId}`);
    }

    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
export const productControllers = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
