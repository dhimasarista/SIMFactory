const multer = require('multer');

const pdfStorage = multer.memoryStorage();

const uploadPdf = multer({
    storage: pdfStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("File format should PDF"));
        }
    }
})

module.exports = {
    uploadPdf
}