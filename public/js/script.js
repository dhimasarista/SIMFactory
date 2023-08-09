function updateRealTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'};
    const formattedDateTime = now.toLocaleDateString('id-ID', options); // Sesuaikan dengan locale yang Anda inginkan
    
    document.getElementById('realTime').textContent = formattedDateTime;
  }

  // Update real-time setiap detik
  setInterval(updateRealTime, 1000);

  // Panggil update pertama kali saat halaman dimuat
  updateRealTime();