import * as timelineService from "./timeline.service.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const createTimelineEvent = asyncHandler(async (req, res, next) => {
    const event = await timelineService.createTimelineEvent(req.body);
    res.status(201).json({
        success: true,
        data: event
    });
});

export const getTimelineEvents = asyncHandler(async (req, res, next) => {
    const events = await timelineService.getTimelineEvents();
    res.status(200).json({
        success: true,
        data: events
    });
});

export const updateTimelineEvent = asyncHandler(async (req, res, next) => {
    const event = await timelineService.updateTimelineEvent(
        req.params.id,
        req.body
    );

    res.status(200).json({
        success: true,
        data: event
    });
});

export const deleteTimelineEvent = asyncHandler(async (req, res, next) => {
    const event = await timelineService.deleteTimelineEvent(req.params.id);
    res.status(200).json({
        success: true,
        data: event
    });
});