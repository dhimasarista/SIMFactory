'use strict'

const userAuthorization = (app) => {
    app.use((req, res, next) => {
        try {
          // Mengambil user dari cookies
          const user = req.cookies.user;
          const currentPath = req.originalUrl;
          
          // Pengecualian untuk path /guest
          if (currentPath === "/guest") {
            return next(); // Lanjutkan ke middleware berikutnya
          }
          // Jika tidak ada user atau belum login
          if (!user && currentPath !== "/login") {
            // Maka semua path yang diakses akan dialihkan ke /login
            return res.redirect("/login");  
          }

          const isAdmin = user && user.role === "admin";
          const isProduction = user && user.department === 904;
          const isWarehouse = user && user.department === 903;
          const isHumanResource = user && user.department === 902;
          const isEngineering = user && user.department === 901;
          // const isIT = user && user.department === 905;

          // Pengecualian untuk path /logout
          if (currentPath === "/logout") {
            return next(); // Lanjutkan ke middleware berikutnya
          }

          // Redirect admin ke path /administrator
          if (isAdmin) {
            if (currentPath.startsWith("/administrator")) {
              // Membatalkan eksekusi kode selanjutnya di scope ini
              return next(); // Dan, lanjutkan ke middlware berikutnya
            }
            // Jika `administrator` mengakses path lain
            return res.redirect("/administrator");
          }
          
          // Jika bukan admin, dan mengakses /administrator
          if (!isAdmin && currentPath === "/administrator") {
            // Alihkan ke halaman utama
            return res.redirect("/dashboard");
          }

          
          // Redirect users ke path yang diizinkan
          if (user) {
            // Path yang bisa diakses by login
            if (!user.department && ( currentPath.startsWith("/dashboard") || currentPath.startsWith("/hr") || currentPath.startsWith("/warehouse") || currentPath.startsWith("/production"))) {
              return res.redirect("/login");
            }
            if (isProduction && (currentPath.startsWith("/hr") || currentPath.startsWith("/warehouse"))) {
              return res.redirect("/dashboard");
            }
            if (isWarehouse && (currentPath.startsWith("/production") || currentPath.startsWith("/hr"))) {
              return res.redirect("/dashboard");
            }
            if (isHumanResource && (currentPath.startsWith("/warehouse") || currentPath.startsWith("/production"))) {
              return res.redirect("/dashboard");
            }
            if (isEngineering && (currentPath.startsWith("/warehouse") || currentPath.startsWith("/production") || currentPath.startsWith("/hr"))) {
              return res.redirect("/dashboard");
            }
          }
        } catch(error) {
          console.log("Error: ", error);
        }
        next();
      });
}

module.exports = userAuthorization;
