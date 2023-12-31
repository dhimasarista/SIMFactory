/*
    * Login().render: me-render halaman login dari views/login.ejs
    * Login().post: 
        ** Menerima request dari client berupa username dan password
        ** Kemudian mencocokkan request berupa data tersebut ke db 
        ** Jika hasil validasi password user dengan bcrypt true,
        ** User diizikan masuk, dan disimpan ke dalam cookies dengan waktu 1 jam
        ** Cookies disimpan dengan nama user:
            *** id di cookies dari id user, digunakan untuk mencocokkan data dengan id employee
            *** role dibagi 2, 
                **** data dari admins tabel hanya bisa mengakses halaman administrator
                **** users tabel untuk mengakses halaman-halaman aplikasi dan tidak bisa mengakses halaman administrator
            *** department_id, digunankan untuk path mana saja yang bisa diakses sesuai departemen-nya
*/

const { validationResult, check } = require("express-validator");
const { yellow, red, qm, symbol } = require("../utils/logging");
const bcrypt = require("bcrypt");
const pool = require("../../config/database");;
const promisePool = pool.promise();
const jwt = require('jsonwebtoken');
const secretCode = require("../utils/secretCode");

class Login{
    constructor(app){
        this.app = app;

        this.setupRoutes();
    }
    setupRoutes(){
        this.app.get("/guest", (req, res) => {
            // Cek apakah cookies pengguna sudah ada
            const user = req.cookies.user;
            if (!user) {
                // Jika cookies kosong, tambahkan cookies untuk pengguna tamu
                res.cookie("user", {
                    id: 99,
                    username: "guest",
                    role: "notUser",
                    department: null // Sesuaikan jika diperlukan
                });
            }
            // Selanjutnya, arahkan pengguna ke "/"
            res.redirect("/monitoring");
        });

        this.app.route("/login")
        .get((req,res) => {
            // Merender views: login.ejs untuk path /login
            res.clearCookie("user");
            res.render("login", {errors: [{}]});
        })
        .post(
            check('username').notEmpty().withMessage('Username harus diisi.'),
            check('password').notEmpty().withMessage('Password harus diisi.'),
            // Validasi ke dbms
            async (req, res) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.render("login", {errors: errors.array()});
                }
                // Mengambil data dari permintaan HTTP yang dikirm user dari form
                const username = req.body.username;
                const password = req.body.password;
                const stayLoggedIn = req.body.stay;
    
                try {    
                    const [userResults] = await promisePool.query("SELECT * FROM users WHERE username = ? OR id = ?", [username, username]);
                    const user = userResults[0];
                    
                    // Jika data tidak cocok disalah satu tabel
                    if (!user) {
                        // Maka akan menampilkan username atau password salah
                        return res.render("login", {
                            errors: [{message: "Username salah!"}]
                        });
                    }
                    const passwordMatch = await bcrypt.compare(password, user.password); // Memeriksa password apakah cocok dengan username dari tabel
                    // Jika passowrd benar | passwordMatch = true
                    if (passwordMatch) {
                        // Apakah admin tidak undefined
                        if (user.username === "admin") {
                            // jika iya, akan disimpan di cookie
                            res.cookie(
                                "user", {id: user.id, username: user.username, role: "admin"}, 
                                { maxAge: 3600000 }
                            ); // 1 Jam
                            console.log(yellow, `${symbol} ${username} ${new Date().toLocaleString().toUpperCase()}`);
                            // Lalu di alihkan ke halaman utama
                            return res.redirect("/administrator");
                        } else {
                            let maxAge = 3600000;
                            // jika users akan disimpan di cookise
                            if (stayLoggedIn !== undefined) {
                                maxAge = undefined;
                            }
                            res.cookie("user", {id: user.id, username: user.username, role: "employee", department: user.department_id}, { maxAge: maxAge }); // 1 Jam
                            console.log(yellow, `${symbol} ${username} ${new Date().toLocaleString().toUpperCase()}`);

                            // Lalu di alihkan ke halaman utama
                            return res.redirect("/dashboard");
                        }
                    // Jika password salah
                    } else {
                        // Akan tetap berada di halaman login
                        return res.render("login", {
                            // Dan menampilkan pesan berikut
                            errors: [{message: "Password salah!"}]
                        });
                    }
    
                    
                } catch(error){
                    console.log(red,`${qm} Error Executing SQL Query: ${error}`);
                    return res.render("login", {
                        errors: [{message: "Terjadi kesalahan saat login. Silahkan coba lagi."}]
                    })
                }
            }
        )
    }
}

class Logout{
    constructor(app){
        this.app = app;

        this.clearAndRedirect();
    }

    // Method Logout: Menghapus cookie user dan mengalihkan ke /login
    clearAndRedirect(){
      this.app.get("/logout", (req, res) => {
        res.clearCookie('user');
        res.redirect('/login');
      })  
    }
}

module.exports = {
    Login, 
    Logout
};
