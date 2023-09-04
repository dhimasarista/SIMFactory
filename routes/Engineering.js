const { errorHandling, errorLogging} = require('../utils/errorHandling');

class Engineering {
    constructor(app) {
        this.app = app;

        this.setupRoutes();
    }

    setupRoutes(){
        this.app.route("/engineering/model")
        .get(async (req, res) => {
            const user = req.cookies.user;
            const path = req.path;
            try {
                res.render("engineering_model", {
                    user,
                    path
                });
            } catch (error) {
                errorHandling(res, user, path, error);
            }
        })
    }
}

module.exports = Engineering;