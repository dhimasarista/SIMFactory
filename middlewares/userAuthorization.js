'use strict'

const userAuthorization = (app) => {
    app.use((req, res, next) => {
        try {
          // Mengambil user dari cookies
          const user = req.cookies.user;
          const currentPath = req.originalUrl;

          const isAdmin = user && user.role === "admin";
          const isProduction = user && user.department === 904;
          const isWarehouse = user && user.department === 903;
          const isHumanResource = user && user.department === 902;
          const isEngineering = user && user.department === 901;
          // const isIT = user && user.department === 905;
          
          // Path yang hanya bisa diakses tanpa autentikasi
          if (currentPath === "/guest") {
            return next(); // Lanjutkan ke middleware berikutnya
          }
          if (currentPath === "/logout") {
            return next(); // Lanjutkan ke middleware berikutnya
          }
          if (currentPath === "/") {
            return next(); // Lanjutkan ke middleware berikutnya
          }

          // Path /monitoring akan dialihkan ke /monitoring/production
          if (currentPath === "/monitoring") {
            res.redirect("/monitoring/production");
          }

          // Jika tidak ada user atau belum login
          if (!user && currentPath !== "/login") {
            // Maka semua path yang diakses akan dialihkan ke /login
            return res.redirect("/login");  
          }

          // // Hanya hr yang dapat mengakses update dan delete data
          // if (user.department === isHumanResource && (currentPath.startsWith("/upload") || currentPath.startsWith("/delete"))) {
          //   next();
          // }

          // Admin hanya bisa mengakses /administrator
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

          // Path yang diizinkan berdasarkan role dan department
          // Path / dan /monitoring dapat diakses menggunakan user guest
          
          // Path yang bisa diakses by login
          if (user) {
            // Jika department null dan mengakses /dashboard /production dll
            // arahkan ke path login
            if (!user.department && ( currentPath.startsWith("/dashboard") || currentPath.startsWith("/hr") || currentPath.startsWith("/warehouse") || currentPath.startsWith("/production"))) {
              return res.redirect("/login");
            }
            // Production hanya bisa mengakses /production/ & /dashboard
            if (isProduction && (currentPath.startsWith("/hr") || currentPath.startsWith("/warehouse"))) {
              return res.redirect("/dashboard");
            }
            // Warehouse hanya bisa mengakses /warehouse/ & /dashboard
            if (isWarehouse && (currentPath.startsWith("/production") || currentPath.startsWith("/hr"))) {
              return res.redirect("/dashboard");
            }
            // Human resource hanya bisa mengakses /hr/ & /dashboard
            if (isHumanResource && (currentPath.startsWith("/warehouse") || currentPath.startsWith("/production"))) {
              return res.redirect("/dashboard");
            }
            // Dan engineering /engineering/ & /dashboard
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
