var express = require("express");
var router = express.Router();

var authenticationService = require("./AuthenticationService")

// KOMMT HIER NOCH IRGENDWAS REIN???


router.get('/', (req, res) => {
    authenticationService.createSessionToken(req.headers.authorization, (err, token, user) => {
        if (token) {
            res.header("Authorization", "Bearer " + token);
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(401).json({err: 'Not Authorized'});
            }
        } else {
            res.status(401).json({ err: "Not Authorized" });
        }
    })
});

module.exports = router;