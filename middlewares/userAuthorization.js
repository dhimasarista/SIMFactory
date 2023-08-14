const userAuthorization = (app) => {
    app.use((req, res, next) => {
        // Mengambil user dari cookies
        const user = req.cookies.user;
        // Jika tidak ada / belum login
        if (!user && req.originalUrl !== "/login") {
          // Maka semua path yang diakses akan dialihkan ke /login
          return res.redirect("/login");  
        }
      
        next();
      });
}

module.exports = userAuthorization;