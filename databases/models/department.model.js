import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

const Department = mongoose.model("Department", departmentSchema);

export default Department;
