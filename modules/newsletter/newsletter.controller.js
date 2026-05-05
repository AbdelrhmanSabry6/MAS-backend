import * as newsletterService from "./newsletter.service.js";
import NewsletterSub from "../../databases/models/newsletterSub.model.js";
import asyncHandler from "../../utils/asyncHandler.js";

// user
export const create = asyncHandler(async (req, res, next) => {
    const { email } = req.body;

    const sub = await newsletterService.subscribe(email);

    res.status(201).json({
        success: true,
        data: sub
    });
});

// export CSV
export const exportCSV = asyncHandler(async (req, res, next) => {
    const subs = await NewsletterSub.find().sort({ createdAt: -1 });

    // header
    let csv = "email,confirmed,subscribedAt\n";

    // data
    subs.forEach((sub) => {
        csv += `${sub.email},${sub.confirmed},${sub.createdAt}\n`;
    });

    // response
    res.header("Content-Type", "text/csv");
    res.attachment("subscribers.csv");
    res.send(csv);
});

// admin
export const getAll = asyncHandler(async (req, res, next) => {
    const subs = await newsletterService.getSubscribers();
    res.status(200).json({
        success: true,
        data: subs
    });
});

export const remove = asyncHandler(async (req, res, next) => {
    const sub = await newsletterService.deleteSubscriber(req.params.id);
    res.status(200).json({
        success: true,
        data: sub
    });
});