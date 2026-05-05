import TimelineEvent from "../../databases/models/timelineEvent.model.js";
import AppError from "../../utils/AppError.js";

export const createTimelineEvent = async (data) => {
    const event = new TimelineEvent(data);
    return await event.save();
};

export const getTimelineEvents = async () => {
    return await TimelineEvent.find().sort({ year: 1, sortOrder: 1 });
};

export const updateTimelineEvent = async (id, data) => {
    const event = await TimelineEvent.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });

    if (!event) throw new AppError("Timeline event not found", 404);

    return event;
};

export const deleteTimelineEvent = async (id) => {
    const event = await TimelineEvent.findByIdAndDelete(id);

    if (!event) throw new AppError("Timeline event not found", 404);

    return event;
};