// Mengimpor modul
const path = require('path');
const fs = require('fs');
const multer = require('multer');

/*
    Folder /uploads menjadi tempat sementara file 
    yang kemudian akan dikirim ke database dengan format buffer
    dan disimpan dalam tipe data BLOB
 */

// Menyiapkan penyimpanan untuk mengunggah gambar
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images/')  // Specify the image storage directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)  // Specify the saved file name
    }
});

// Konfigurasi Multer dengan storage
const uploadImage = multer({ storage: imageStorage });

// Menghapus file gambar dari folder /uploads
function deleteImage(imageFile) {
    const imagePath = path.join(__dirname, "..", 'uploads', "images", imageFile);
    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error('Error deleting image:', err);
        }
    });
}

module.exports = {
    uploadImage,
    deleteImage,
}