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

            res.render("index");
        });
        this.app.get("/dashboard", render);
    }
}

module.exports = Index;