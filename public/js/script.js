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

// Membuat 
const inactivityDuration = 2000; // 1 Menit (dalam milidetik) 60000
const logoutDuration = 10000; // 10 Menit (dalam milidetik)600000

const showToast = () => {
  toastr.warning("Your session will expire soon due to inactivity.", "Attention");
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "20000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
}
const showLogoutAlert = () => {
  Swal.fire({
    title: "You're logged off",
    text: "Please login again.",
    icon: "warning",
    confirmButtonText: "OK",
  }).then((result) => {
    logout();
  });
}

const logout = () => {
  window.location.href = "/logout";
}


// Jika user tidak aktif
// Tampilkan toastr

// Jika user aktif kembali
// Reset timeout
function resetInactivity() {
  let inactivityTimeout;
  clearTimeout(inactivityTimeout);

  setTimeout(() => {
    showToast();
    resetLogout();
  }, inactivityDuration); // 1 Menit (dalam milidetik) 60000
} resetInactivity();

function resetLogout() {
  let logoutTimeout;
  clearTimeout(logoutTimeout);
  setTimeout(() => {
    showLogoutAlert();
  }, logoutDuration); // 10 Menit (dalam milidetik) 600000

}
document.addEventListener("mousemove", resetInactivity);
document.addEventListener("keydown", resetInactivity);



