const express = require('express');
const router = express.Router();
const userService = require('./UserService');
const authenticationService = require('../authentication/AuthenticationService');

router.get('/', (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: 'Not authorized, invalid token' })
    } else {
        authenticationService.verifyJWT(req.headers.authorization, async (error, result) => {
            if (result) {
                if (result.isAdministrator) {
                    const users = await userService.getUsers(false);
                    res.status(200).json(users);
                } else {
                    res.status(401).json({ error: 'Not authorized' });
                }
            } else {
                res.status(401).json({ error: 'Invalid token' })
            }
        })
    }
});

router.get('/:userID', (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: 'Not authorized, invalid token' })
    } else {
        authenticationService.verifyJWT(req.headers.authorization, (error, result) => {
            if (result) {
                if (result.isAdministrator || result.user == req.params.userID) {
                    const userId = req.params['userID'];
                    userService.findUserBy(userId, false, (error, result) => {
                        if (result) {
                            res.status(200).json(result);
                        } else {
                            res.status(400).json({ error: 'User with specified user ID not found!' });
                        }
                    });
                } else {
                    res.status(401).json({ error: 'Not Authorized!' });
                }
            } else {
                res.status(401).json({ error: 'Invalid token' });
            }
        })
    }
});

router.post('/', (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: 'Not authorized, invalid token' })
    } else {
        authenticationService.verifyJWT(req.headers.authorization, (error, result) => {
            if (result) {
                if (result.isAdministrator) {
                    const user = req.body;
                    userService.registerUser(user, false, (error, result) => {
                        if (result) {
                            res.status(200).json(result);
                        } else {
                            res.status(400).json({ error: error });
                        }
                    });
                } else {
                    res.status(401).json({ error: 'Not Authorized!' });
                }
            } else {
                res.status(401).json({ error: 'Invalid token' });
            }
        });
    };
});

router.put('/:userID', async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: 'Not authorized, invalid token' })
    } else {
        authenticationService.verifyJWT(req.headers.authorization, (error, result) => {
            if (result) {
                if (result.isAdministrator || result.user == req.params.userID) {
                    const userId = req.params['userID'];
                    const toBeUpdated = req.body;
                    userService.updateFirstAndLastName(toBeUpdated, userId, false, (error, result) => {
                        if (result) {
                            res.status(200).json(result);
                        } else {
                            if (error) {
                                res.status(404).json({ error: error });
                            }
                        }
                    });
                } else {
                    res.status(401).json({ error: 'Not Authorized!' });
                }
            } else {
                res.status(401).json({ error: 'Invalid token' });
            }
        })
    }
});



router.delete('/:userID', async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: 'Not authorized, invalid token' })
    } else {
        authenticationService.verifyJWT(req.headers.authorization, async (error, result) => {
            if (result) {
                if (result.isAdministrator) {
                    const userId = req.params['userID'];
                    await userService.deleteUser(userId, (error, result) => {
                        if (result) {
                            res.status(204).json();
                            console.log(`User with ID: (${userId}) was successfully deleted.`);
                        } else {
                            res.status(404).json({ error: error });
                        }
                    });
                } else {
                    res.status(401).json({ error: 'Not Authorized!' });
                }
            } else {
                res.status(401).json({ error: 'Invalid token' });
            }
        })
    }
});

module.exports = router;
