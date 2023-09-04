class Models {
    constructor(app) {
        this.app = app;
    }

    setupRoutes(){
        this.app.route("/engineering/models")
        .get(async (req, res) => {

            try {
                res.render("engineering_models");
            } catch (error) {
                
            }
        })
    }
}