const { render } = require("../controllers/index");

class Index{
    constructor(app){
        this.app = app;

        this.setupRoutes();
        // this.setupMiddlewares();
    }
    // Method halaman utama
    setupRoutes(){
        this.app.get("/", render);
    }
}

module.exports = Index;