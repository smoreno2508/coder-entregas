import { productService } from "../services/index.js";
import { successResponse } from "../helpers/responseMaker.js";

const createProduct = async (req, res, next) => {  
    try {
        const product = await productService.createProduct(req.body);
        successResponse(res, 'Product created successfully', product);
    } catch (err) {
        next(err);
    }
}


const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productService.updateProduct(id, req.body);
        successResponse(res, 'Product updated successfully', product);
    } catch (err) {
        next(err);
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        await productService.deleteProduct(id);
        successResponse(res, 'Product deleted successfully');
    } catch (err) {
        next(err);
    }
}

const getProducts = async (req, res, next) => {
    try {

        const { page, limit, sort, ...otherQuery } = req.query;

        const parsedPage = page ? parseInt(page, 10) : undefined;
        const parsedLimit = limit ? parseInt(limit, 10) : undefined;

        const products = await productService.getProducts({
            page: parsedPage,
            limit: parsedLimit,
            sort,
            query: otherQuery 
        });

        successResponse(res, 'Products fetched successfully', products);
    } catch (err) {
        next(err);
    }
}

const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productService.getProductById(id);
        successResponse(res, 'Product fetched successfully', product);
    } catch (err) {
        next(err);
    }
}


export {
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductById
}