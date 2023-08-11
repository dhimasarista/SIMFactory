const { validationResult, check } = require("express-validator");
const { yellow, red, qm, symbol } = require("../utils/logging");
const bcrypt = require("bcrypt");
const pool = require("../configs/database");
const promisePool = pool.promise();

class Login{
    constructor(app){
        this.app = app;
    }
    // Merender views: login.ejs untuk path /login
    get(){
       this.app.get("/login", (req,res) => {
            res.render("login", {errors: [{}]});
       });
    }

    post(){
        this.app.post("/login",
        check('username').notEmpty().withMessage('Username harus diisi.'),
        check('password').notEmpty().withMessage('Password harus diisi.'),
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render("login", {errors: errors.array()})
            }
            // Mengambil data dari permintaan HTTP yang dikirm user dari form
            const username = req.body.username;
            const password = req.body.password;

            try {
                // Mengambil data dari Tabel Admins dan menyimpannya dalam bentuk Array of Object
                const [results] = await promisePool .query("SELECT * FROM admins WHERE username = ?", [username]);
                // Menyimpannya ke variabel user dalam bentuk objek
                const user = results[0];
                
                // Jika nilai user diatas kosong (tidak ditemukan oleh results)
                if (!user) {
                    // Maka akan menampilkan username atau password salah
                    return res.render("login", {
                        errors: [{message: "Username salah!"}]
                    });
                }
                
                // Unhasing password dengan komparator bcrypt 
                const passwordMatch = await bcrypt.compare(password, user.password);
                // Jika passowrd benar
                if (passwordMatch) {
                    // user akan disimpan di cookie
                    res.cookie("user", user.username, { maxAge: 3600000 }); // 1 Jam
                    console.log(yellow, `${symbol} ${username} ${new Date().toLocaleString().toUpperCase()}`);

                    // Lalu di alihkan ke halaman utama
                    return res.redirect("/");
                // Jika password salah
                } else {
                    // Akan tetap berada di halaman login
                    return res.render("login", {
                        // Dan menampilkan pesan berikut
                        errors: [{message: "Username atau Password salah!"}]
                    });
                }
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

    // Method Logout: Menghapus cookie user dan mengalihkan ke /login
    get(){
      this.app.get("/logout", (req, res) => {
        res.clearCookie('user');
        res.redirect('/login');
      })  
    }
}

module.exports = {Login, Logout};