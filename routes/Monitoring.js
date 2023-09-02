class Monitoring{
    constructor(app) {
        this.app = app;

        this.setupRoutes();
    }

    setupRoutes(){
        this.app.route("/monitoring/production")
        .get((req, res) => {
            const user = req.cookies.user;
            const path = req.path;

            res.render("500", {
                user,
                path,
                errors: ["Belum dibuat"]
            });
        });

        this.app.route("/monitoring/materials")
        .get((req, res) => {
            const user = req.cookies.user;
            const path = req.path;

            res.render("500", {
                user,
                path,
                errors: ["Belum dibuat"]
            });
        })
    }
}

module.exports = Monitoring;