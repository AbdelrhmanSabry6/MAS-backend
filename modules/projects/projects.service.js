import Project from "../../databases/models/project.model.js";
import AppError from "../../utils/AppError.js";

export const createProject = async (data) => {
    if (data.galleryIds && typeof data.galleryIds === "string") {
        data.galleryIds = JSON.parse(data.galleryIds);
    }

    const project = await Project.create(data);

    return await Project.findById(project._id)
        .populate("categoryId")
        .populate("coverImageId")
        .populate("galleryIds");
};

export const updateProject = async (id, data) => {
    if (data.galleryIds && typeof data.galleryIds === "string") {
        data.galleryIds = JSON.parse(data.galleryIds);
    }

    const project = await Project.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    })
        .populate("categoryId")
        .populate("coverImageId")
        .populate("galleryIds");

    if (!project) {
        throw new AppError("Project not found", 404);
    }

    return project;
};

export const deleteProject = async (id) => {
    const project = await Project.findById(id)
        .populate("categoryId")
        .populate("coverImageId")
        .populate("galleryIds");

    if (!project) {
        throw new AppError("Project not found", 404);
    }

    await project.deleteOne();

    return project;
};

export const getProjects = async (queryParams) => {
    const { search } = queryParams;

    const query = {};

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { client: { $regex: search, $options: "i" } },
        ];
    }

    return await Project.find(query)
        .populate("categoryId")
        .populate("coverImageId")
        .populate("galleryIds")
        .sort({ createdAt: -1 });
};