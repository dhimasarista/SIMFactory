window.onload = function() {
    if (window.location.pathname === '/login') {
      // Mengalihkan kembali ke root path saat tombol reload ditekan
      window.location.href = '/';
    }
  };
  