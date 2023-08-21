'use strict'

const userAuthorization = (app) => {
    app.use((req, res, next) => {
        try {
          // Mengambil user dari cookies
          const user = req.cookies.user;
          const currentPath = req.originalUrl;
          
          // Jika tidak ada user atau belum login
          if (!user && currentPath !== "/login") {
            // Maka semua path yang diakses akan dialihkan ke /login
            return res.redirect("/login");  
          }

          const isAdmin = user && user.role === "admin";
          const isProduction = user && user.department === 904;
          const isWarehouse = user && user.department === 903;
          const isHumanResource = user && user.department === 902;
          
          // Pengecualian untuk path /logout
          if (currentPath === "/logout") {
            return next(); // Lanjutkan ke middleware berikutnya
          }

          // Redirect admin ke path /administrator
          if (isAdmin) {
            if (currentPath.startsWith("/administrator")) {
              return next();
            }
            return res.redirect("/administrator");
          }
          
          // Jika bukan admin, dan mengakses /administrator
          if (!isAdmin && currentPath === "/administrator") {
            // Alihkan ke halaman utama
            return res.redirect("/");
          }
          
          // Redirect users based on their department
          if (user) {
            if (isProduction && (currentPath.startsWith("/hr") || currentPath.startsWith("/warehouse"))) {
              return res.redirect("/");
            }
            if (isWarehouse && (currentPath.startsWith("/production") || currentPath.startsWith("/hr"))) {
              return res.redirect("/");
            }
            if (isHumanResource && (currentPath.startsWith("/warehouse") || currentPath.startsWith("/production"))) {
              return res.redirect("/");
            }
          }
        } catch(error) {
          console.log("Error: ", error);
        }
        next();
      });
}

module.exports = userAuthorization;
