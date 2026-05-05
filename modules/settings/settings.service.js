import SiteSettings from "../../databases/models/siteSettings.model.js";

const populateSettings = (query) => {
    return query
        .populate("logoId")
        .populate("faviconId");
};

export const getSettings = async () => {
    let settings = await populateSettings(SiteSettings.findOne());

    if (!settings) {
        const createdSettings = await SiteSettings.create({});
        settings = await populateSettings(SiteSettings.findById(createdSettings._id));
    }

    return settings;
};

export const updateSettings = async (data) => {
    let settings = await SiteSettings.findOne();

    if (!settings) {
        const createdSettings = await SiteSettings.create(data);
        return await populateSettings(SiteSettings.findById(createdSettings._id));
    }

    const updatedSettings = await SiteSettings.findByIdAndUpdate(
        settings._id,
        data,
        {
            new: true,
            runValidators: true,
        }
    );

    return await populateSettings(SiteSettings.findById(updatedSettings._id));
};