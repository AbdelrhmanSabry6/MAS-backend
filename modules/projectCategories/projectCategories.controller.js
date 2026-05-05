import * as projectCategoriesService from "./projectCategories.service.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const create = asyncHandler(async (req, res, next) => {
    const category = await projectCategoriesService.createProjectCategory(req.body);
    res.status(201).json({
        success: true,
        data: category
    });
});

export const getAll = asyncHandler(async (req, res, next) => {
    const categories = await projectCategoriesService.getAllProjectCategories();
    res.status(200).json({
        success: true,
        data: categories
    });
});

export const update = asyncHandler(async (req, res, next) => {
    const category = await projectCategoriesService.updateProjectCategory(
        req.params.id,
        req.body
    );
    res.status(200).json({
        success: true,
        data: category
    });
});

export const remove = asyncHandler(async (req, res, next) => {
    const category = await projectCategoriesService.deleteProjectCategory(req.params.id);
    res.status(200).json({
        success: true,
        data: category
    });
});