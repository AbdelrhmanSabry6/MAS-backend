import Service from "../../databases/models/service.model.js";
import AppError from "../../utils/AppError.js";

export const createService = async (data) => {
    const service = new Service(data);
    await service.save();

    return await Service.findById(service._id).populate("coverImage");
};

export const updateService = async (id, data) => {
    const service = await Service.findByIdAndUpdate(id, data, {
        new: true,
    }).populate("coverImage");

    if (!service) {
        throw new AppError("Service not found", 404);
    }

    return service;
};

export const deleteService = async (id) => {
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
        throw new AppError("Service not found", 404);
    }

    return service;
};

export const getAllServices = async () => {
    return await Service.find()
        .populate("coverImage")
        .sort({ sortOrder: 1, createdAt: -1 });
};