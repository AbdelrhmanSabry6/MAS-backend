import Media from "../../databases/models/media.model.js";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";

import {
    createHeroSlideService,
    getActiveHeroSlidesService,
    getAllHeroSlidesService,
    updateHeroSlideService,
    deleteHeroSlideService,
} from "./heroSlides.service.js";

export const createHeroSlide = async (req, res, next) => {
    try {

        console.log("CONTENT TYPE:", req.headers["content-type"]);
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);


        const {
            eyebrow,
            title,
            subtitle,
            sortOrder,
            active,
            backgroundImage,
        } = req.body;

        let finalBackgroundImage = backgroundImage;

        if (req.file) {
            const uploaded = await uploadToCloudinary(req.file.buffer, "mas/hero-slides");
            const media = await Media.create({
                url: uploaded.secure_url,
                publicId: uploaded.public_id,
                type: req.file.mimetype,
                size: req.file.size,
                alt: title || req.file.originalname,
            });

            finalBackgroundImage = media._id;
        }

        if (!finalBackgroundImage) {
            return res.status(400).json({
                success: false,
                message: "Invalid input data. Background image is required",
            });
        }

        const heroSlide = await createHeroSlideService({
            eyebrow,
            title,
            subtitle,
            backgroundImage: finalBackgroundImage,
            sortOrder: sortOrder ? Number(sortOrder) : 0,
            active: active === "true" || active === true,
        });

        res.status(201).json({
            success: true,
            message: "Hero slide created successfully",
            data: heroSlide,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllHeroSlides = async (req, res, next) => {
    try {
        const heroSlides = await getAllHeroSlidesService();

        res.status(200).json({
            success: true,
            message: "Hero slides fetched successfully",
            data: heroSlides,
        });
    } catch (error) {
        next(error);
    }
};

export const getActiveHeroSlides = async (req, res, next) => {
    try {
        const heroSlides = await getActiveHeroSlidesService();

        res.status(200).json({
            success: true,
            message: "Active hero slides fetched successfully",
            data: heroSlides,
        });
    } catch (error) {
        next(error);
    }
};



export const updateHeroSlide = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updateData = { ...req.body };

        if (req.file) {
            const uploaded = await uploadToCloudinary(req.file.buffer, "mas/hero-slides");
            const media = await Media.create({
                url: uploaded.secure_url,
                publicId: uploaded.public_id,
                type: req.file.mimetype,
                size: req.file.size,
                alt: req.body.title || req.file.originalname,
            });

            updateData.backgroundImageId = media._id;
        }

        if (updateData.sortOrder !== undefined) {
            updateData.sortOrder = Number(updateData.sortOrder);
        }

        if (updateData.active !== undefined) {
            updateData.active = updateData.active === "true" || updateData.active === true;
        }

        const heroSlide = await updateHeroSlideService(id, updateData);

        if (!heroSlide) {
            return res.status(404).json({
                success: false,
                message: "Hero slide not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Hero slide updated successfully",
            data: heroSlide,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteHeroSlide = async (req, res, next) => {
    try {
        const { id } = req.params;

        const heroSlide = await deleteHeroSlideService(id);

        if (!heroSlide) {
            return res.status(404).json({
                success: false,
                message: "Hero slide not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Hero slide deleted successfully",
            data: heroSlide,
        });
    } catch (error) {
        next(error);
    }
};