const { render } = require("../controllers/index");

class Index{
    constructor(app){
        this.app = app;

        this.setupRoutes();
        // this.setupMiddlewares();
    }
    // Method halaman utama
    setupRoutes(){
        this.app.get("/", (req, res) => {
            // const user = req.cookies.user;
            // res.render("index", { user });
            res.redirect("/monitoring/production");
        });
        this.app.get("/dashboard", render);
    }
}

module.exports = Index;