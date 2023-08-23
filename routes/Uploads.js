const { upload, deleteImage } = require("../utils/uploads/fileUploads");

class Uploads{
    constructor(app) {
        this.app = app   
    }

    uploadImage(){
        this.app.post("/upload/image", upload.single("image"), (req, res) => {
            const uploadedImage = req.file;
            // console.log(uploadedImage);

            const data = {
                fileName: uploadedImage.fileName,
                mimeType: uploadedImage.mimeType
            }
        });
    }

    deleteImage(){
        this.app.get("/delete/image/:file", (req, res) => {
            const fileName = req.params.file;
            console.log(fileName);
            deleteImage(fileName);

            res.status(200).send(`Image ${fileName} has been deleted from server.`);
        })
    }
}

module.exports = {
    Uploads
}