const { promisify } = require('util');
const pool = require("../configs/database");
const queryAsync = promisify(pool.query).bind(pool);
const io = require('../middlewares/socketio');


class Testing{
    constructor(app){
        this.app = app;

        this.testSocket();
    }

    testSocket() {
        this.app.get("/testing/socket", async (req, res) => {
            try {
                const employees = await queryAsync("SELECT name FROM employees");
                res.render("test", { employees });
            } catch (error) {
                console.log(error);
            }
        });
    }
    
}

module.exports = Testing;