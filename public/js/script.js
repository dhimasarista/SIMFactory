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
          // const imageElement = document.getElementById('photo-profile');
          // if (data.image == null) {
          //     imageElement.src = "../images/profile.jpg";
          // } else {
          //     imageElement.src = `data:image/jpeg;base64,${arrayBufferToBase64(data.image.data)}`;
          // }