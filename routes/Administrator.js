class Administrator{
    constructor(app){
        this.app = app;
    }

    get(){
        this.app.get("/administrator", (req, res) => {
            const user = req.cookies.user;
            const path = req.path;
            res.render("administrator", {user, path});
        });
    }
}

module.exports = Administrator;