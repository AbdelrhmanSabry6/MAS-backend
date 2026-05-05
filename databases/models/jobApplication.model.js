import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
    {
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 150,
        },
        email: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 255,
        },
        phone: { type: String },
        linkedin: { type: String },
        coverLetter: {
            type: String,
            maxlength: 10000,
        },
        cv: {
            url: { type: String, required: true },
            publicId: { type: String, required: true },
            originalName: { type: String },
            type: { type: String },
            size: { type: Number },
        },
        status: {
            type: String,
            enum: ["new", "reviewing", "interview", "rejected", "hired"],
            required: true,
            default: "new",
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

// Recommended compound index
jobApplicationSchema.index({ jobId: 1, createdAt: -1 });

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

export default JobApplication;
