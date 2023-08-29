const errorHandling = require("../utils/errorHandling");

class Production{
    constructor(app){
        this.app = app;

        this.prodControlRoutes();
    }

    prodControlRoutes(){
        this.app.get("/production/control",(req, res) => {
            try {
                // Mengambil user dari cookie
                const user = req.cookies.user;
                const path = req.path;

                throw new Error("Internal Server Error");
                
                // Rendering views: prod_control.ejs
                res.render("prod_control", {
                    path: path, 
                    user: user
                });
            } catch (error) {
                errorHandling(res,error);
            }
        });
    }
}

module.exports = Production;