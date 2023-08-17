class Errors500{
    constructor(app){
        this.app = app;
    }

    error500(){
        this.app.get("/error/500", (req, res) => {
            const user = req.cookies.user;
            const path = req.path;
            res.render("500", {user, path, errors: [{}]});
        })
    }
    
}

class Errors400{
    constructor(app){
        this.app = app;
    }

    error404(){        
        this.app.get("/error/404", (req, res) => {
            const user = req.cookies.user;
            const path = req.path;
            res.render("404", {user, path, errors: [{}]});
        })
    }
}

module.exports = {
    Errors400,
    Errors500
}