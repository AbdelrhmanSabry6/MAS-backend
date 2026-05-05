import Job from "../../databases/models/job.model.js";
import AppError from "../../utils/AppError.js";

export const createJob = async (data) => {
    const job = new Job(data);
    return await job.save();
};

export const getJobs = async (queryParams) => {
    const { search } = queryParams;
    const query = {};

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
        ];

    }

    return await Job.find(query)
        .populate("departmentId")
        .sort({ postedAt: -1 });
};

export const getJobById = async (id) => {
    const job = await Job.findById(id).populate("departmentId");
    if (!job) {
        throw new AppError("Job not found", 404);
    }
    return job;
};

export const updateJob = async (id, data) => {
    const job = await Job.findByIdAndUpdate(id, data, { new: true, runValidators: true })
        .populate("departmentId");
    if (!job) {
        throw new AppError("Job not found", 404);
    }
    return job;
};

export const deleteJob = async (id) => {
    const job = await Job.findByIdAndDelete(id);
    if (!job) {
        throw new AppError("Job not found", 404);
    }
    return job;
};
