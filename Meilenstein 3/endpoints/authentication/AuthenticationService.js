var userService = require("../user/UserService");
var jwt = require("jsonwebtoken");
var config = require("config");

const createSessionToken = (username, password, callback) => {
    console.log('\n--------------------------------------------------------------------------');
    if (!username || !password) {
        console.log("ERROR: USERNAME OR PASSWORD MISSING!")
        return callback(null, "Username or password missing!");
    }
    userService.findUserBy(username, true, (error, user) => {
        if (user) {
            console.log("USER FOUND, CHECKING PASSWORD.")
            user.comparePassword(password, (error, isMatch) => {
                if (error) {
                    console.log("WRONG PASSWORD!");
                    callback(error, null);
                }
                else {
                    if (isMatch) {
                        console.log("PASSWORD IS CORRECT, CREATING TOKEN.");
                        const issuedAt = new Date().getTime();
                        const expirationTime = config.get("session.timeout");
                        const expiresAt = issuedAt + (expirationTime);
                        const privateKey = config.get("session.tokenKey");
                        const token = jwt.sign({ "user": user.userID, "isAdministrator": user.isAdministrator }, privateKey, { expiresIn: expiresAt, algorithm: "HS256" });
                        if (token) {
                            console.log('TOKEN CREATED SUCCESSFULLY!');
                            console.log('--------------------------------------------------------------------------\n');
                        } else {
                            console.log('COULD NOT CREATE TOKEN!');
                        }
                        return callback(null, token);
                    } else {
                        console.log("ERROR: USERNAME OR PASSWORD IS WRONG!");
                        console.log('--------------------------------------------------------------------------\n');
                        return callback(error, null);
                    }
                }
            })
        } else {
            return callback('Cannot create session token, because user was not found!', null);
        }
    })
}

module.exports = {
    createSessionToken
}