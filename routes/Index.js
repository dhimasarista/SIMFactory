const { validationResult } = require("express-validator");

module.exports = class Index{
    constructor(app){
        this.app = app;
    }
    // Method halaman utama
    get(){
        this.app.get("/", (req, res) => {
            // Mengambil user dari cookie
            const user = req.cookies.user;
            const path = req.path;
            // Rendering views: index.ejs
            res.render("index", {
                errors: [],
                user,
                path: path});
        });
    }
}