const { validationResult, check } = require("express-validator");
const { yellow, red, qm, symbol } = require("../utils/logging");
const bcrypt = require("bcrypt");
const pool = require("../configs/database");
const { use } = require("chai");
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
                const [adminResults] = await promisePool.query("SELECT * FROM admins WHERE username = ?", [username]);
                // Menyimpannya ke variabel user dalam bentuk objek
                const admin = adminResults[0];

                const [userResults] = await promisePool.query("SELECT * FROM users WHERE username = ? OR id = ?", [username, username]);
                const user = userResults[0];
                
                // Jika nilai admin diatas kosong (tidak ditemukan oleh results)
                if (!admin && !user) {
                    // Maka akan menampilkan username atau password salah
                    return res.render("login", {
                        errors: [{message: "Username salah!"}]
                    });
                }

                const passwordChecking = (admin == undefined) ? user.password: admin.password;
                const cookiesChecking = (admin == undefined) ? user.username: admin.username;
                // Unhasing password dengan komparator bcrypt 
                const passwordMatch = await bcrypt.compare(password, passwordChecking);
                // Jika passowrd benar
                if (passwordMatch) {
                    if (admin) {
                        // user akan disimpan di cookie
                        res.cookie("user", { username: cookiesChecking, role: "admin"} , { maxAge: 3600000 }); // 1 Jam
                        console.log(yellow, `${symbol} ${username} ${new Date().toLocaleString().toUpperCase()}`);

                        // Lalu di alihkan ke halaman utama
                        return res.redirect("/administrator");
                    } else {
                        // user akan disimpan di cookise
                        res.cookie("user", { username: cookiesChecking, role: "user", department: user.department_id} , { maxAge: 3600000 }); // 1 Jam
                        console.log(yellow, `${symbol} ${username} ${new Date().toLocaleString().toUpperCase()}`);

                        // Lalu di alihkan ke halaman utama
                        return res.redirect("/");
                    }
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