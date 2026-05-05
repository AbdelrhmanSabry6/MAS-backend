import * as countriesService from "./countries.service.js";
import asyncHandler from "../../utils/asyncHandler.js";

// CREATE
export const createCountry = asyncHandler(async (req, res, next) => {
    const country = await countriesService.createCountry(req.body);
    res.status(201).json({
        success: true,
        data: country
    });
});

// GET ALL
export const getCountries = asyncHandler(async (req, res, next) => {
    const countries = await countriesService.getCountries();
    res.status(200).json({
        success: true,
        data: countries
    });
});

// UPDATE
export const updateCountry = asyncHandler(async (req, res, next) => {
    const country = await countriesService.updateCountry(
        req.params.id,
        req.body
    );
    res.status(200).json({
        success: true,
        data: country
    });
});

// DELETE
export const deleteCountry = asyncHandler(async (req, res, next) => {
    const country = await countriesService.deleteCountry(req.params.id);
    res.status(200).json({
        success: true,
        data: country
    });
});