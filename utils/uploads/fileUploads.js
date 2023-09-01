const multer = require('multer');
const fs = require('fs');
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, "uploads/images/");
        } else if (file.mimetype === "application/pdf") {
            cb(null, "uploads/pdfs/");
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

const deleteImageHandler = (imageFile) => {
    const imagePath = path.join(__dirname, "..", "..", 'uploads', "images", imageFile);
    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error('Error deleting image:', err);
        }
    });
}

const deletePdfHandler = async (pdfFile) => {
    const pdfPath = path.join(__dirname, "..", "..", "uploads", "pdfs", pdfFile);
    try {
        await fs.promises.unlink(pdfPath);
        console.log(`File Berhasil Dihapus ${pdfFile}`);
    } catch (error) {
        // Terjadi logging error walaupun kode ok
        // console.log("Error deleting pdf:", error);
    }
}

module.exports = {
    upload,
    deleteImageHandler,
    deletePdfHandler
};