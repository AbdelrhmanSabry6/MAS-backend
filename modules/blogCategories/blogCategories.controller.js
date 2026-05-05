import * as blogCategoriesService from "./blogCategories.service.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const createBlogCategory = asyncHandler(async (req, res, next) => {
    const category = await blogCategoriesService.createBlogCategory(req.body);
    res.status(201).json({
        success: true,
        data: category
    });
});

export const getAllBlogCategories = asyncHandler(async (req, res, next) => {
    const categories = await blogCategoriesService.getAllBlogCategories();
    res.status(200).json({
        success: true,
        data: categories
    });
});

export const updateBlogCategory = asyncHandler(async (req, res, next) => {
    const category = await blogCategoriesService.updateBlogCategory(
        req.params.id,
        req.body
    );

    res.status(200).json({
        success: true,
        data: category
    });
});

export const deleteBlogCategory = asyncHandler(async (req, res, next) => {
    const category = await blogCategoriesService.deleteBlogCategory(
        req.params.id
    );

    res.status(200).json({
        success: true,
        data: category
    });
});