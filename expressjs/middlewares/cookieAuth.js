// Memeriksa cookie apakah cocok dengan data di db, jika tidak res.clearCookie("user");
/* 
Kasus ini dapat disebut sebagai penipuan perangkat lunak (software fraud) atau manipulasi cookie. Ini adalah situasi di mana seseorang mencoba memanipulasi atau memalsukan cookies yang digunakan oleh aplikasi web untuk mencoba mendapatkan akses atau hak istimewa yang seharusnya tidak dimilikinya. Tindakan semacam ini dapat mencoba mengeksploitasi celah keamanan dalam aplikasi.

Untuk mengatasi potensi risiko ini, Anda dapat mengambil beberapa tindakan keamanan berikut:

Validasi Server: Selalu lakukan validasi dan verifikasi server-side untuk memastikan bahwa informasi yang diterima dari cookies adalah sah dan valid. Jangan hanya bergantung pada data cookies yang dikirim oleh klien.

Enkripsi Cookies: Jika memungkinkan, enkripsi data yang disimpan dalam cookies sehingga data tersebut tidak dapat dengan mudah dimanipulasi oleh pengguna akhir.

Signed Cookies: Menggunakan signed cookies adalah praktik yang baik. Ini melibatkan menandatangani (sign) cookies dengan kunci rahasia server sehingga Anda dapat memverifikasi keaslian cookies saat diterima.

Session Management: Gunakan manajemen sesi yang kuat dan aman. Sesi pengguna harus disimpan di server, dan hanya referensi ke sesi (misalnya, ID sesi) yang disimpan dalam cookies klien. Ini akan membuat lebih sulit bagi penyerang untuk memalsukan sesi.

Pemantauan Aktivitas: Lakukan pemantauan aktif atas aktivitas pengguna. Jika ada aktivitas yang mencurigakan atau tidak wajar (seperti perubahan yang cepat dalam cookies), reaksi yang sesuai dapat diambil.

Validasi Input: Selalu lakukan validasi input dari pengguna dan pastikan data yang diterima adalah data yang sah.

Perbarui dan Lindungi Dependencies: Pastikan Anda selalu menggunakan versi terbaru dari perangkat lunak dan library yang Anda gunakan, dan lindungi aplikasi Anda dari kerentanan yang diketahui.

Pelajari Tentang OWASP: Familiarisasi dengan daftar OWASP (Open Web Application Security Project) tentang risiko keamanan web yang umum dan ikuti panduan keamanan yang sesuai untuk melindungi aplikasi Anda.

Pengujian Keamanan: Lakukan pengujian penetrasi (penetration testing) secara teratur pada aplikasi Anda untuk mengidentifikasi potensi kerentanan dan masalah keamanan.

Pelaporan dan Penanganan Insiden: Siapkan rencana respons keamanan yang memungkinkan Anda untuk merespons dengan cepat jika terjadi pelanggaran keamanan atau aktivitas mencurigakan
*/