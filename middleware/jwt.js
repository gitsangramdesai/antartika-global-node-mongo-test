var jwt = require('jsonwebtoken');

var CONSTANT = require('../config/constant.js');
const JWT_SECRET = CONSTANT.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            console.log("user:",user);
            console.log("Now:", Math.floor(Date.now()/1000));

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};


module.exports={
    authenticateJWT:authenticateJWT
}