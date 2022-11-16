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
                    const users = await userService.getUsers();
                    res.status(200).send(users);
                } else {
                    res.status(401).json('Not authorized');
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
                    userService.findUserBy(userId, (error, result) => {
                        if (result) {
                            res.status(200).json(result);
                        } else {
                            res.status(400).json({ error: 'User with specified user ID not found!' });
                        }
                    });
                }
            } else {
                res.status(401).json({ error: 'Invalid token' });
            }
        })
    }
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
                    userService.updateFirstAndLastName(toBeUpdated, userId, (result, error) => {
                        if (result) {
                            res.status(200).json(result);
                        } else {
                            if (error) {
                                res.status(404).json(error);
                            }
                        }
                    });
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
                    userService.registerUser(user, (error, result) => {
                        if (result) {
                            res.status(200).json(result);
                        } else {
                            res.status(400).json(error);
                        }
                    });
                }
            } else {
                res.status(401).json({ error: 'Invalid token' });
            }
        });
    };
});

router.delete('/:userID', async (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: 'Not authorized, invalid token' })
    } else {
        authenticationService.verifyJWT(req.headers.authorization, async (error, result) => {
            if (result) {
                if (result.isAdministrator || result.user == req.params.userID) {
                    const userId = req.params['userID'];
                    const deleted = await userService.deleteUser(userId, (result, error) => {
                        if (result) {
                            res.status(204).json(`User with ID: (${userId}) was successfully deleted.`);
                            console.log(`User with ID: (${userId}) was successfully deleted.`);
                        } else {
                            res.status(404).json(error);
                        }
                    });
                }
            } else {
                res.status(401).json({ error: 'Invalid token' });
            }
        })
    }
});

module.exports = router;
