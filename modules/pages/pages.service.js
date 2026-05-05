import Page from "../../databases/models/page.model.js";
import AppError from "../../utils/AppError.js";

// --- Media Library fields to populate on read operations ---
const MEDIA_POPULATES = ["heroImage"];

export const createPage = async (data) => {
    // Accept both formats:
    // - Legacy: { heroImage: "/uploads/hero.png" }
    // - New:    { heroImageId: "64a..." }
    // Both can coexist on the same document during the migration period.
    const page = new Page(data);
    return await page.save();
};

export const updatePage = async (id, data) => {
    // Accept both legacy string URLs and new Media ObjectId references.
    const page = await Page.findByIdAndUpdate(id, data, { new: true });
    if (!page) {
        throw new AppError("Page not found", 404);
    }
    return page;
};

export const deletePage = async (id) => {
    const page = await Page.findByIdAndDelete(id);
    if (!page) {
        throw new AppError("Page not found", 404);
    }

    return page;
};

export const getPage = async (id) => {
    const page = await Page.findById(id).populate(MEDIA_POPULATES);
    if (!page) {
        throw new AppError("Page not found", 404);
    }
    return page;
};

export const getAllPages = async () => {
    const pages = await Page.find()
        .populate(MEDIA_POPULATES)
        .populate("heroImage");
    if (!pages) {
        throw new AppError("Pages not found", 404);
    }
    return pages;
};
