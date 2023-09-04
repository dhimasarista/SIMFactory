const { errorHandling, errorLogging} = require('../utils/errorHandling');
const { promisify } = require('util');
const pool = require("../configs/database");
const queryAsync = promisify(pool.query).bind(pool);

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
            const query = `SELECT * FROM models`;

            // kode awal model 024682
            try {
                const results = await queryAsync(query);
                res.render("engineering_model", {
                    user,
                    path,
                    data: results
                });
            } catch (error) {
                errorHandling(res, user, path, error);
            }
        })
    }
}

module.exports = Engineering;