// isAuthenticated
function isAuthenticated(req, res, next) {
    if (req.headers.authorization !== 'undefined') {
        let token = req.headers.authorization.split(' ')[1];
        var privtaeKey = config

        jwt.verify((err, user) => {
            if (err) {
                res.status(401).json({ Error: 'Not Authorized' });
                return;
            }
            if (token) {
                payload = JSON.parse(atob(token.split('.')[1]));
                req.tokenData = payload;
                req.userID = payload.userID
                return next();
            } else {
                res.status(401).json({ Error: 'Not Authorized' });
                return;
            }
        });
    } else {
        res.status(401).json({ Error: 'Not Authorized' });
    }
    //maybe somethin else here
}



// isAdministrator