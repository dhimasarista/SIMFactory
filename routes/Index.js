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
            const user = req.cookies.user;
            console.log(user);
            res.render("index", { user });
        });
        this.app.get("/dashboard", render);
    }
}

module.exports = Index;