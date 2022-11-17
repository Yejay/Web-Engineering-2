const express = require("express");
const router = express.Router();

const authenticationService = require("./AuthenticationService")


router.get('/', (req, res) => {
    authenticationService.createSessionToken(req.headers.authorization, (error, token) => {
        if (token) {
            res.status(200).header("Authorization", "Bearer " + token).json({message: 'Authorization successful'});
        } else {
            res.status(401).json({ error: "Not Authorized" });
        }
    })
});

module.exports = router;