module.exports = class {
    constructor(app){
        this.app = app;
    }

    prodMonitoringRoute(){
        this.app.get("/prod/monitoring",(req, res) => {
            const user = req.cookies.user;
            const path = req.path;
            res.render("prod_monitoring", {path: path, user});
        });
    }
}