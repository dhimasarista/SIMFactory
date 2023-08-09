class ProductionControl{
    constructor(app){
        this.app = app;
    }

    get(){
        this.app.get("/production/control",(req, res) => {
            const user = req.cookies.user;
            const path = req.path;
            res.render("prod_control", {path: path, user});
        });
    }
}

module.exports = {
    ProductionControl
}