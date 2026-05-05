import mongoose from "mongoose";

const heroSlideSchema = new mongoose.Schema(
    {
        eyebrow: {
            type: String,
            trim: true,
            default: "",
        },

        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },

        subtitle: {
            type: String,
            trim: true,
            default: "",
        },

        backgroundImage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Media",
            required: [true, "Background image is required"],
        },

        sortOrder: {
            type: Number,
            default: 0,
            min: 0,
        },

        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const HeroSlide = mongoose.model("HeroSlide", heroSlideSchema);

export default HeroSlide;