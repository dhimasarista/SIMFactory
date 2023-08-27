class Material{
    constructor(app){
        this.app = app;
    }

    render(){
        this.app.get("/warehouse/material", (req, res) => {
            const user = req.cookies.user;
            const path = req.path;
            const query = `SELECT * FROM materials`;

            // Merender: views/material.ejs
            try {
                res.render("material",{
                    path,
                    user
                })
            } catch (error) {
                
            }
        })
    }
}

module.exports = {
    Material
}