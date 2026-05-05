import mongoose from "mongoose";

const statSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    label: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
        default: 0,
    },
    suffix: { type: String }, // e.g. "+", "%"
    icon: { type: String },
    sortOrder: {
        type: Number,
        required: true,
        default: 0,
    },
});

const Stat = mongoose.model("Stat", statSchema);

export default Stat;
