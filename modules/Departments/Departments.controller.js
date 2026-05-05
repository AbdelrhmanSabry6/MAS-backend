import * as departmentsService from "./Departments.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/AppError.js";

export const create = asyncHandler(async (req, res, next) => {
    const department = await departmentsService.createDepartment(req.body);
    if (!department) {
        throw new AppError("Failed to create department", 400);
    }
    res.status(201).json({
        success: true,
        data: department
    });
});

export const getAll = asyncHandler(async (req, res, next) => {
    const departments = await departmentsService.getDepartments(req.query);
    res.status(200).json({
        success: true,
        data: departments
    });
});

export const update = asyncHandler(async (req, res, next) => {
    const department = await departmentsService.updateDepartment(req.params.id, req.body);
    res.status(200).json({
        success: true,
        data: department
    });
});

export const remove = asyncHandler(async (req, res, next) => {
    const department = await departmentsService.deleteDepartment(req.params.id);
    res.status(200).json({
        success: true,
        message: "Department deleted successfully",
        data: department
    });
});