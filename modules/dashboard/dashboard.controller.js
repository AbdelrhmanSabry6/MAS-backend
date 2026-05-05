import * as DashboardService from "./dashboard.service.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getDashboardStats = asyncHandler(async (req, res, next) => {
    const stats = await DashboardService.getDashboardStats();

    res.status(200).json({
        success: true,
        data: stats
    });
});