import mongoose from "mongoose";

const timelineEventSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: { type: String },
    icon: { type: String },
    sortOrder: {
        type: Number,
        required: true,
        default: 0,
    },
});

const TimelineEvent = mongoose.model("TimelineEvent", timelineEventSchema);

export default TimelineEvent;
