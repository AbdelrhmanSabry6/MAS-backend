import JobApplication from "../../databases/models/jobApplication.model.js";
import AppError from "../../utils/AppError.js";

// user apply
export const createApplication = async (data) => {
    const application = new JobApplication(data);
    return await application.save();
};

// admin get all
export const getApplications = async () => {
    return await JobApplication.find()
        .populate("jobId", "title")
        .sort({ createdAt: -1 });
};

// get one
export const getApplicationById = async (id) => {
    const application = await JobApplication.findById(id).populate(
        "jobId",
        "title description"
    );

    if (!application) throw new AppError("Application not found", 404);

    return application;
};

// update status
export const updateStatus = async (id, status) => {
    const application = await JobApplication.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    );

    if (!application) throw new AppError("Application not found", 404);

    return application;
};

// delete
export const deleteApplication = async (id) => {
    const application = await JobApplication.findByIdAndDelete(id);

    if (!application) throw new AppError("Application not found", 404);

    return application;
};