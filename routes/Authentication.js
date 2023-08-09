const { validationResult, check } = require("express-validator");
const { yellow, red, qm, symbol } = require("../utils/logging");
require("../utils/logging");

class Login{
    constructor(app){
        this.app = app;
    }
    get(){
       this.app.get("/login", (req,res) => {
            res.render("login", {errors: [{}]});
       });
    }

    post(pool){
        this.app.post("/login",
        check('username').notEmpty().withMessage('Username harus diisi.'),
        check('password').notEmpty().withMessage('Password harus diisi.'),
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render("login", {errors: errors.array()})
            }

            const { username, password } = req.body;

            try{
                const [results] = await pool.query("SELECT * FROM admins WHERE username = ? AND password = ?", [username, password]);
                const user = results[0];

                if(!user){
                    return res.render("login", {
                        errors: [{message: "Username atau Password salah!"}]
                    })
                }

                res.cookie("user", user.username, {maxAge: 3600000}); // 1 Jam
                res.redirect("/");

                console.log(yellow,`${symbol} ${username} ${new Date().toLocaleString().toUpperCase()}\n`);
            } catch(error){
                console.log(red,`${qm} Error Executing SQL Query: ${error}`);
                return res.render("login", {
                    errors: [{message: "Terjadi kesalahan saat login. Silahkan coba lagi."}]
                })
            }
        })
    }


}

class Logout{
    constructor(app){
        this.app = app;
    }

    get(){
      this.app.get("/logout", (req, res) => {
        res.clearCookie('user');
        res.redirect('/login');
      })  
    }
}

module.exports = {Login, Logout};