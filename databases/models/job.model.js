import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        title: {
            type: String,
            required: true,
        },
        departmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
        },
        location: { type: String },
        type: { type: String },
        description: { type: String },
        requirements: { type: String },
        benefits: { type: String },
        isOpen: {
            type: Boolean,
            required: true,
            default: true,
        },
        postedAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
        closingAt: { type: Date },
    },
    {
        timestamps: true,
    }
);

jobSchema.index({ isOpen: 1 });

const Job = mongoose.model("Job", jobSchema);

export default Job;
