const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);

        /* res.header('Access-Control-Allow-Headers', Authorization); */
/*         Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE */

    }
    next();
}

module.exports = credentials