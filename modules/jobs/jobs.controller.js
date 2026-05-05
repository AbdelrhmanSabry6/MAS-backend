import * as jobsService from "./jobs.service.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const create = asyncHandler(async (req, res, next) => {
    const job = await jobsService.createJob(req.body);
    res.status(201).json({
        success: true,
        data: job
    });
});

export const getAll = asyncHandler(async (req, res, next) => {
    const jobs = await jobsService.getJobs(req.query);
    res.status(200).json({
        success: true,
        data: jobs
    });
});

export const getById = asyncHandler(async (req, res, next) => {
    const job = await jobsService.getJobById(req.params.id);
    res.status(200).json({
        success: true,
        data: job
    });
});

export const update = asyncHandler(async (req, res, next) => {
    const job = await jobsService.updateJob(req.params.id, req.body);
    res.status(200).json({
        success: true,
        data: job
    });
});

export const remove = asyncHandler(async (req, res, next) => {
    const job = await jobsService.deleteJob(req.params.id);
    res.status(200).json({
        success: true,
        message: "Job deleted successfully",
        data: job
    });
});
