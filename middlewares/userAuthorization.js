'use strict'

const userAuthorization = (app) => {
    app.use((req, res, next) => {
        // Mengambil user dari cookies
        const user = req.cookies.user;
        
        const currentPath = req.originalUrl
        
        // Jika tidak ada / belum login
        if (!user && currentPath !== "/login") {
          
          // Maka semua path yang diakses akan dialihkan ke /login
          return res.redirect("/login");  
        }

        const isAdmin = user && user.role === "admin";
        
        // Pengecualian untuk path /logout
        if (currentPath === "/logout") {
          return next(); // Lanjutkan ke middleware berikutnya
        }

        if (isAdmin) {
          if (currentPath.startsWith("/administrator")) {
            return next();
          }
          return res.redirect("/administrator");
        }
        if (!isAdmin && currentPath === "/administrator") {
          return res.redirect("/");
        }
      
        next();
      });
}

module.exports = userAuthorization;