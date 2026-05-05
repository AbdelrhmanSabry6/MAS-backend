import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema(
    {
        // Legacy/direct URL fields
        logoUrl: {
            type: String,
            default: "",
        },

        faviconUrl: {
            type: String,
            default: "",
        },

        // Media Library references
        logoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Media",
            default: null,
        },

        faviconId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Media",
            default: null,
        },

        brand: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        }, // colors, fonts, brandName, tagline

        contact: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        }, // phone, email, address

        social: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        }, // facebook, instagram, linkedin, twitter

        seo: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        }, // title, description, keywords

        toggles: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        }, // feature flags

        integrations: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        }, // GA, GTM, pixels
    },
    {
        timestamps: { createdAt: false, updatedAt: true },
    }
);

const SiteSettings = mongoose.model("SiteSettings", siteSettingsSchema);

export default SiteSettings;