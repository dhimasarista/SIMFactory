class ProductionControl{
    constructor(app){
        this.app = app;
    }

    // Method halaman Production/ProductionControl
    get(){
        this.app.get("/production/control",(req, res) => {
            // Mengambil user dari cookie
            const user = req.cookies.user;
            const path = req.path;
            // Rendering views: prod_control.ejs
            res.render("prod_control", {path: path, user});
        });
    }
}

module.exports = {
    ProductionControl
}