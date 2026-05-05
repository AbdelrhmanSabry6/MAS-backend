import * as SettingsService from "./settings.service.js";
import asyncHandler from "../../utils/asyncHandler.js";

const parseJsonField = (value) => {
    if (!value) return value;

    if (typeof value === "string") {
        return JSON.parse(value);
    }

    return value;
};

export const getSettings = asyncHandler(async (req, res, next) => {
    const settings = await SettingsService.getSettings();

    res.status(200).json({
        success: true,
        data: settings
    });
});

export const updateSettings = asyncHandler(async (req, res, next) => {
    const data = { ...req.body };

    if (req.body.brand) {
        data.brand = parseJsonField(req.body.brand);
    }

    if (req.body.contact) {
        data.contact = parseJsonField(req.body.contact);
    }

    if (req.body.social) {
        data.social = parseJsonField(req.body.social);
    }

    if (req.body.seo) {
        data.seo = parseJsonField(req.body.seo);
    }

    if (req.body.toggles) {
        data.toggles = parseJsonField(req.body.toggles);
    }

    if (req.body.integrations) {
        data.integrations = parseJsonField(req.body.integrations);
    }

    const settings = await SettingsService.updateSettings(data);

    res.status(200).json({
        success: true,
        data: settings
    });
});