import * as messagesService from "./messages.service.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const create = asyncHandler(async (req, res, next) => {
    const message = await messagesService.createMessage(req.body);
    res.status(201).json({
        success: true,
        data: message
    });
});

export const getAll = asyncHandler(async (req, res, next) => {
    const messages = await messagesService.getMessages();
    res.status(200).json({
        success: true,
        data: messages
    });
});

export const getById = asyncHandler(async (req, res, next) => {
    const message = await messagesService.getMessageById(req.params.id);
    res.status(200).json({
        success: true,
        data: message
    });
});

export const markRead = asyncHandler(async (req, res, next) => {
    const message = await messagesService.markAsRead(req.params.id);
    res.status(200).json({
        success: true,
        data: message
    });
});

export const remove = asyncHandler(async (req, res, next) => {
    const message = await messagesService.deleteMessage(req.params.id);
    res.status(200).json({
        success: true,
        data: message
    });
});

export const stats = asyncHandler(async (req, res, next) => {
    const result = await messagesService.getMessagesStats();
    res.status(200).json({
        success: true,
        data: result
    });
});