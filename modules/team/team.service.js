import TeamMember from "../../databases/models/teamMember.model.js";
import AppError from "../../utils/AppError.js";

export const createTeamMember = async (data) => {
    const member = new TeamMember(data);
    await member.save();

    return await TeamMember.findById(member._id)
        .populate("photoId");
};

export const updateTeamMember = async (id, data) => {
    const member = await TeamMember.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    }).populate("photoId");

    if (!member) {
        throw new AppError("Team member not found", 404);
    }

    return member;
};

export const deleteTeamMember = async (id) => {
    const member = await TeamMember.findByIdAndDelete(id);

    if (!member) {
        throw new AppError("Team member not found", 404);
    }

    return member;
};

export const getAllTeamMembers = async () => {
    return await TeamMember.find()
        .populate("photoId")
        .sort({ sortOrder: 1, createdAt: -1 });
};

export const getTeamMemberById = async (id) => {
    const member = await TeamMember.findById(id)
        .populate("photoId");

    if (!member) {
        throw new AppError("Team member not found", 404);
    }

    return member;
};