const { red, qm } = require('../utils/logging');
const errorHandling = (res, error) => {
    console.log(red, `${qm} Error: `, error);
    const errorMessage = encodeURIComponent(error.message);
    res.redirect(`/error/500?message=${errorMessage}`); // Mengalihkan Ke Halaman Error 500
}

module.exports = errorHandling;