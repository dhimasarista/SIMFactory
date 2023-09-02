const {errorHandling} = require("../utils/errorHandling");

class Production{
    constructor(app){
        this.app = app;

        this.prodControlRoutes();
    }

    prodControlRoutes(){
        this.app.get("/production/control",(req, res) => {
            // Mengambil user dari cookie
            const user = req.cookies.user;
            const path = req.path;
            try {
                // Rendering views: prod_control.ejs
                res.render("prod_control", {
                    path: path, 
                    user: user
                });
            } catch (error) {
                errorHandling(res, user, path, error);
            }
        });
    }
}

module.exports = Production;