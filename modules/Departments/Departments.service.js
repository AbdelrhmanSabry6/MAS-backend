import Department from "../../databases/models/department.model.js";
import AppError from "../../utils/AppError.js";

export const createDepartment = async (data) => {
    const department = new Department(data);
    return await department.save();
};

export const getDepartments = async (queryParams) => {
    const { search } = queryParams;

    const query = {};

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: "i" } },
        ];
    }

    return await Department.find(query)
        .sort({ createdAt: -1 });
};



export const updateDepartment = async (id, data) => {
    const department = await Department.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!department) {
        throw new AppError("Department not found", 404);
    }
    return department;
};

export const deleteDepartment = async (id) => {
    const department = await Department.findByIdAndDelete(id);
    if (!department) {
        throw new AppError("Department not found", 404);
    }
    return department;
};