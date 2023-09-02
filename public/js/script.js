const escapeHTML = (html) => {
  return document.createElement('div').appendChild(document.createTextNode(html)).parentNode.innerHTML;
}
$.widget.bridge('uibutton', $.ui.button);
window.onload = function() {
  if (window.location.pathname === '/login') {
    // Mengalihkan kembali ke root path saat tombol reload ditekan
    window.location.href = '/';
  } 
};


// lgtm [js/unused-local-variable]
function toPascalCase(text) {
  var words = text.toLowerCase().split(' ');
  for (var i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toLocaleUpperCase() + words[i].slice(1);
  }
  return words.join(' ');
}

    const tdElements  = document.querySelectorAll("td");
    tdElements.forEach((td) => {
        td.textContent = toPascalCase(td.textContent);
    })

function printContent() {
  window.print();
}

// Konversi nilai buffer (BLOB) ke gambar
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// fetch("/hr/employee/2002")
// .then(response => response.json())
// .then(results => {
//     console.log(results);
//  });

// toastr.options = {
//   "closeButton": false,
//   "debug": false,
//   "newestOnTop": false,
//   "progressBar": false,
//   "positionClass": "toast-top-right",
//   "preventDuplicates": false,
//   "onclick": null,
//   "showDuration": "300",
//   "hideDuration": "1000",
//   "timeOut": "5000",
//   "extendedTimeOut": "1000",
//   "showEasing": "swing",
//   "hideEasing": "linear",
//   "showMethod": "fadeIn",
//   "hideMethod": "fadeOut"
// }
const inactivityCheck = () => {
  let inactivityTimeout;
const inactivityDuration = 60000; // 1 Menit (dalam milidetik)

const showToast = () => {
  toastr.warning("It seems inactivity.", "Attention");
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
}

function resetInactivity() {
  clearTimeout(inactivityTimeout);

  inactivityTimeout = setTimeout(() => {
    showToast();
  }, inactivityDuration);
}

  // Mulai perhitungan ketidakaktifan ketika mouse atau keyboard bergerak
  document.addEventListener("mousemove", resetInactivity);
  document.addEventListener("keydown", resetInactivity);
}

// Menampilkan status offline
// Mengecek status koneksi
function checkOnlineStatus() {
  if (navigator.onLine) {
    // Pengguna online
    return true;
  } else {
    // Pengguna offline
    return false;
  }
}

// Menampilkan pesan jika pengguna offline
function showMessageIfOffline() {
  if (!checkOnlineStatus()) {
    toastr.error("Check Your Connection", "Offline");
  }
}

// Memanggil fungsi untuk menampilkan pesan jika pengguna offline
showMessageIfOffline();

// Mendengarkan perubahan status koneksi
window.addEventListener('online', () => {
  toastr.success("You're Back", "Offline");
});

window.addEventListener('offline', () => {
  // Pengguna menjadi offline, tampilkan pesan
  showMessageIfOffline();
});
