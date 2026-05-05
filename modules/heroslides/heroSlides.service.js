import HeroSlide from "../../databases/models/heroslide.model.js";

export const createHeroSlideService = async (data) => {
    const heroSlide = await HeroSlide.create(data);

    return await HeroSlide.findById(heroSlide._id).populate("backgroundImage");
};

export const getAllHeroSlidesService = async () => {
    return await HeroSlide.find()
        .populate("backgroundImage")
        .sort({ sortOrder: 1, createdAt: -1 });
};

export const getActiveHeroSlidesService = async () => {
    return await HeroSlide.find({ active: true })
        .populate("backgroundImage")
        .sort({ sortOrder: 1, createdAt: -1 });
};



export const updateHeroSlideService = async (id, data) => {
    return await HeroSlide.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    }).populate("backgroundImage");
};

export const deleteHeroSlideService = async (id) => {
    return await HeroSlide.findByIdAndDelete(id).populate("backgroundImage");
};