import Stat from "../../databases/models/stat.model.js";
import AppError from "../../utils/AppError.js";

export const createStat = async (data) => {
    const stat = new Stat(data);
    return await stat.save();
};

export const getStats = async () => {
    return await Stat.find().sort({ sortOrder: 1 });
};

export const updateStat = async (id, data) => {
    const stat = await Stat.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });

    if (!stat) throw new AppError("Stat not found", 404);

    return stat;
};

export const deleteStat = async (id) => {
    const stat = await Stat.findByIdAndDelete(id);

    if (!stat) throw new AppError("Stat not found", 404);

    return stat;
};