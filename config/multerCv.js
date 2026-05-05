import multer from "multer";

// storage in memory for Cloudinary upload
const storage = multer.memoryStorage();

// filter PDF only
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed"), false);
    }
};

const uploadCv = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});

export default uploadCv;
