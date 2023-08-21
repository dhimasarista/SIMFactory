const { red, qm } = require('../utils/logging');
const errorHandling = (res, error) => {
    console.log(red, `${qm} Error: `, error);
    res.status(500).json({ error: 'Internal Server Error' });
}

module.exports = errorHandling;