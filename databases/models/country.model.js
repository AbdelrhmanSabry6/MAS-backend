import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: { type: String }, // ISO-2
    lat: { type: Number },
    lng: { type: Number },
    projectsCount: {
        type: Number,
        required: true,
        default: 0,
    },
});

const Country = mongoose.model("Country", countrySchema);

export default Country;
