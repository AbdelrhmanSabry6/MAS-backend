import * as ClientsService from "./clients.service.js";
import Media from "../../databases/models/media.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";

export const createClient = asyncHandler(async (req, res, next) => {
    const data = { ...req.body };

    if (req.file) {
        const uploaded = await uploadToCloudinary(req.file.buffer, "mas/clients");
        const media = await Media.create({
            url: uploaded.secure_url,
            publicId: uploaded.public_id,
            type: req.file.mimetype,
            size: req.file.size,
            alt: req.body.logoAlt || req.file.originalname,
        });

        data.logoId = media._id;
    }

    if (req.body.year !== undefined) {
        data.year = Number(req.body.year);
    }

    if (req.body.sortOrder !== undefined) {
        data.sortOrder = Number(req.body.sortOrder);
    }

    const client = await ClientsService.createClient(data);

    res.status(201).json({
        success: true,
        data: client
    });
});

export const updateClient = asyncHandler(async (req, res, next) => {
    const data = { ...req.body };

    if (req.file) {
        const uploaded = await uploadToCloudinary(req.file.buffer, "mas/clients");
        const media = await Media.create({
            url: uploaded.secure_url,
            publicId: uploaded.public_id,
            type: req.file.mimetype,
            size: req.file.size,
            alt: req.body.logoAlt || req.file.originalname,
        });

        data.logoId = media._id;
    }

    if (req.body.year !== undefined) {
        data.year = Number(req.body.year);
    }

    if (req.body.sortOrder !== undefined) {
        data.sortOrder = Number(req.body.sortOrder);
    }

    const client = await ClientsService.updateClient(req.params.id, data);

    res.status(200).json({
        success: true,
        data: client
    });
});

export const deleteClient = asyncHandler(async (req, res, next) => {
    const client = await ClientsService.deleteClient(req.params.id);

    res.status(200).json({
        success: true,
        data: client
    });
});

export const getAllClients = asyncHandler(async (req, res, next) => {
    const clients = await ClientsService.getAllClients();

    res.status(200).json({
        success: true,
        data: clients
    });
});

export const getClientById = asyncHandler(async (req, res, next) => {
    const client = await ClientsService.getClientById(req.params.id);

    res.status(200).json({
        success: true,
        data: client
    });
});