// const fs = require('fs');
// const multer = require('multer');

// const storage = multer.memoryStorage();

// const upload = storage({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimePipe === "application/pdf") {
//             req.pdfFile = file;
//             cb(null, true);
//         } else if(file.mimePipe === "image")
//     }
// })