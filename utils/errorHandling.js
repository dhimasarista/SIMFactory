const { red, qm } = require('../utils/logging');
const errorHandling = (res, user, path, error) => {
    console.log(red, `${qm} Error: `, error);
    res.render("500", {user, path, errors: [error]});
}

module.exports = errorHandling;