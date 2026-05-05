import multer from "multer";
import AppError from "../utils/AppError.js";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
        return cb(new AppError("Only image files are allowed", 400), false);
    }

    cb(null, true);
};

const uploadImage = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

export default uploadImage;
