const multer = require('multer');
const fs = require('fs');
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, "uploads/images/");
        } else if (file.mimetype === "application/pdf") {
            cb(null, "uploads/pdf/");
        } else {
            cb(new Error("Unsupported file type"));
        }
    },
    filename: (req, file, cb) => {
        // const uniqeSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const deleteImage = (imageFile) => {
    const imagePath = path.join(__dirname, "..", "..", 'uploads', "images", imageFile);
    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error('Error deleting image:', err);
        }
    });
}

module.exports = {
    upload,
    deleteImage
};