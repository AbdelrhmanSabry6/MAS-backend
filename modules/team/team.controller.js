import * as TeamService from "./team.service.js";
import Media from "../../databases/models/media.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";

export const createTeamMember = asyncHandler(async (req, res, next) => {
    const data = { ...req.body };

    // photo upload -> Media Library -> save media _id in photoId
    if (req.file) {
        const uploaded = await uploadToCloudinary(req.file.buffer, "mas/team");
        const media = await Media.create({
            url: uploaded.secure_url,
            publicId: uploaded.public_id,
            type: req.file.mimetype,
            size: req.file.size,
            alt: req.body.photoAlt || req.file.originalname,
        });

        data.photoId = media._id;
    }

    // social from form-data string to object
    if (req.body.social) {
        data.social =
            typeof req.body.social === "string"
                ? JSON.parse(req.body.social)
                : req.body.social;
    }

    // sortOrder from string to number
    if (req.body.sortOrder !== undefined) {
        data.sortOrder = Number(req.body.sortOrder);
    }

    const member = await TeamService.createTeamMember(data);

    res.status(201).json({
        success: true,
        data: member
    });
});

export const updateTeamMember = asyncHandler(async (req, res, next) => {
    const data = { ...req.body };

    // new photo upload -> Media Library -> update photoId
    if (req.file) {
        const uploaded = await uploadToCloudinary(req.file.buffer, "mas/team");
        const media = await Media.create({
            url: uploaded.secure_url,
            publicId: uploaded.public_id,
            type: req.file.mimetype,
            size: req.file.size,
            alt: req.body.photoAlt || req.file.originalname,
        });

        data.photoId = media._id;
    }

    // social from form-data string to object
    if (req.body.social) {
        data.social =
            typeof req.body.social === "string"
                ? JSON.parse(req.body.social)
                : req.body.social;
    }

    // sortOrder from string to number
    if (req.body.sortOrder !== undefined) {
        data.sortOrder = Number(req.body.sortOrder);
    }

    const member = await TeamService.updateTeamMember(req.params.id, data);

    res.status(200).json({
        success: true,
        data: member
    });
});

export const deleteTeamMember = asyncHandler(async (req, res, next) => {
    const member = await TeamService.deleteTeamMember(req.params.id);

    res.status(200).json({
        success: true,
        data: member
    });
});

export const getAllTeamMembers = asyncHandler(async (req, res, next) => {
    const members = await TeamService.getAllTeamMembers();

    res.status(200).json({
        success: true,
        data: members
    });
});

export const getTeamMemberById = asyncHandler(async (req, res, next) => {
    const member = await TeamService.getTeamMemberById(req.params.id);

    res.status(200).json({
        success: true,
        data: member
    });
});