import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
    {
        label: { type: String, required: true },
        url: { type: String, required: true },
        children: [{ type: mongoose.Schema.Types.Mixed }],
    },
    { _id: false }
);

const menuSchema = new mongoose.Schema(
    {
        location: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        items: {
            type: [menuItemSchema],
            required: true,
        },
    },
    {
        timestamps: { createdAt: false, updatedAt: true },
    }
);

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
