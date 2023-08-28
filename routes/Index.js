const { get } = require("../controllers/index");

class Index{
    constructor(app){
        this.app = app;
    }
    // Method halaman utama
    index(){
        this.app.get("/", get);
    }
}

module.exports = Index;