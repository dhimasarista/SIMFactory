const { validationResult } = require("express-validator");

module.exports = class IndexRoute{
    constructor(app){
        this.app = app;
    }
    get(){
        this.app.get("/", (req, res) => {
            const user = req.cookies.user;
            const path = req.path;
            res.render("index", {
                errors: [],
                user,
                path: path});
        });
    }
}