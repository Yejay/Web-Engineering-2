var userService = require("../user/UserService");
var jwt = require("jsonwebtoken");
var config = require("config");

function createSessionToken(props, callback) {
    console.log("AuthenticationService: create Token");
    if (!props) {
        console.log("Error: have no json body")
        callback("JSON-Body missing", null, null)
        return;
    }
    const base64Credentials = props.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    userService.findUserBy(username, true, function (error, user) {
        console.log('in find user');
        if (user) {
            console.log("Found user, check the password")
            user.comparePassword(password, function (err, isMatch) {
                if (err) {
                    console.log("Password is invalid");
                    callback(err, null);
                }
                else {
                    if (isMatch) {
                        console.log("Password is correct. Create token.");
                        // var issuedAt = new Date().getTime();
                        var expirationTime = config.get("session.timeout");
                        // * 1000
                        // var expiresAt = issuedAt + (expirationTime);
                        var privateKey = config.get("session.tokenKey");
                        var token = jwt.sign({ "user": user.userID, "isAdministrator": user.isAdministrator }, privateKey, { expiresIn: expirationTime * 1000, algorithm: "HS256" });
                        console.log("Token created: " + token);
                        callback(null, token);
                    }
                    else {
                        console.log("Password or user ID are invalid");
                        callback(err, null);
                    }
                }
            })
        }
        else if (error) {
            console.log(error);
            callback("Did not find user", null);
        }
    })
}


function verifyJWT(req, callback) {
    const token = req.split(' ')[1];
    jwt.verify(token, config.get('session.tokenKey'), { algorithms: 'HS256' }, (error, payload) => {
        if (error) {
            return callback(error, null);
        } else {
            return callback(null, payload);
        }
    });
}

module.exports = {
    createSessionToken,
    verifyJWT
}