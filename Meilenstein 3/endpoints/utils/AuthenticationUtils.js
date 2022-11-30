const jwt = require("jsonwebtoken");
const userService = require('../user/UserService');
const config = require('config');


const isAuthenticated = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Not authorized, invalid authorization header' });
    } else {
        let token = req.headers.authorization.split(' ')[1];
        var privateKey = config.get("session.tokenKey");
        jwt.verify(token, privateKey, { algorithms: 'HS256' }, (error, payload) => {
            if (error) {
                res.status(401).json({ Error: 'Not Authorized' });
                return;
            }
            if (token) {
                payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('ascii'));
                req.tokenData = payload;
                req.userID = payload.user;
                return next();
            } else {
                res.status(401).json({ Error: 'Not Authorized' });
                return;
            }
        });
    }
}

const isAuthorized = (req, res, next) => {
    userService.findUserBy(req.userID, false, (error, result) => {
        if (result) {
            if (result.isAdministrator) {
                return next();
            }
            if (req.userID == result.userID) {
                return next();
            }
        } else {
            res.status(400).json({ error: 'User with specified user ID not found!' });
            return;
        }
    });
}

module.exports = {
    isAuthenticated,
    isAuthorized
}