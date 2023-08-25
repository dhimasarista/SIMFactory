const { upload, deleteImageHandler, deletePdfHandler } = require("../utils/uploads/fileUploads");

class Uploads{
    constructor(app) {
        this.app = app   
    }

    uploadImage(){
        try {
            this.app.post("/upload/image", upload.single("image"), (req, res) => {
                res.status(200);
            });
        } catch (error) {
            console.log(red, `${qm} Error: `, error);
        }
    }

    deleteImage(){
        this.app.get("/delete/image/:file", (req, res) => {
            const fileName = req.params.file;
            deleteImageHandler(fileName);

            res.status(200).send(`Image ${fileName} has been deleted from server.`);
        })
    }

    uploadPdf(){
        try {
            this.app.post("/upload/pdf", upload.single("pdf"), (req, res) => {
                res.status(200);
            })
        } catch (error) {
            console.log(red, `${qm} Error: `, error);
        }
    }

    deletePdf(){
        this.app.get("/delete/pdf/:file", async (req, res) => {
            const fileName = req.params.file;
            try {
                await deletePdfHandler(fileName);
                res.status(200).send(`PDF ${fileName} has been deleted from server.`);
            } catch (error) {
                res.status(500).send(`Error ${fileName} deleting from server.`);
            }
        });
    }
}

module.exports = {
    Uploads
}