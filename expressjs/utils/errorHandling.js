const { red, qm } = require('../utils/logging');
const errorHandling = (res, user, path, error) => {
    res.render("500", {user, path, errors: [error]});
}

const errorLogging = (error) => {
    console.log(red, `${qm} Error: `, error);
}

module.exports = {
    errorHandling,
    errorLogging
};