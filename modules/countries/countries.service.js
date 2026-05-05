import Country from "../../databases/models/country.model.js";
import AppError from "../../utils/AppError.js";

export const createCountry = async (data) => {
    const country = new Country(data);
    return await country.save();
};

export const getCountries = async () => {
    return await Country.find().sort({ name: 1 });
};

export const updateCountry = async (id, data) => {
    const country = await Country.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });

    if (!country) throw new AppError("Country not found", 404);

    return country;
};

export const deleteCountry = async (id) => {
    const country = await Country.findByIdAndDelete(id);

    if (!country) throw new AppError("Country not found", 404);

    return country;
};