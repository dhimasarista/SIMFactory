class Errors{
    constructor(app){
        this.app = app;

        this.error400();
        this.error500();
    }
    error500(){
        this.app.get("/error/500", (req, res) => {
            const user = req.cookies.user;
            const path = req.path;
            res.render("500", {user, path, errors: [{}]});
        })
    }
    error400(){        
        this.app.get("/error/404", (req, res) => {
            const user = req.cookies.user;
            const path = req.path;
            res.render("404", {user, path, errors: [{}]});
        })
    }
    
}

module.exports = Errors;