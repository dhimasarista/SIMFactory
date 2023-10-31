const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex'); // Menghasilkan nilai rahasia acak sepanjang 64 karakter dalam format heksadesimal

module.exports = secret;