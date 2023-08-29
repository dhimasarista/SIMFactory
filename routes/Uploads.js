const { upload, deleteImageHandler, deletePdfHandler } = require("../utils/uploads/fileUploads");

class Uploads{
    constructor(app) {
        this.app = app   

        this.image();
        this.pdf();
    }

    image(){
        // Mengupload Foto
        this.app.post("/upload/image", upload.single("image"), (req, res) => {
            try {
                res.status(200);
            } catch (error) {
                console.log(red, `${qm} Error: `, error);
            }
        });

        // Menghapus Foto
        this.app.get("/delete/image/:file", (req, res) => {
            const fileName = req.params.file;
            try {
                deleteImageHandler(fileName);

                res.status(200).send(`Image ${fileName} has been deleted from server.`);
            } catch (error) {
                res.status(500).send(`Error ${fileName} deleting from server.`);
            }
        })
    }

    pdf(){
        // Mengupload PDF
        this.app.post("/upload/pdf", upload.single("pdf"), (req, res) => {
            try {
                res.status(200);
            } catch (error) {
                console.log(red, `${qm} Error: `, error);
            }
        });

        // Menghapus PDF
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

module.exports = Uploads