const express = require("express");
const router = express.Router();

const authenticationService = require("./AuthenticationService")


router.get('/', (req, res) => {
    authenticationService.createSessionToken(req.headers.authorization, (err, token) => {
        if (token) {
            res.status(200).header("Authorization", "Bearer " + token).send('Authorization successfull');
        } else {
            res.status(401).json({ err: "Not Authorized" });
        }
    })
});

module.exports = router;