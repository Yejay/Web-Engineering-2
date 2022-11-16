const express = require('express');
const router = express.Router();

const degreeCourseService = require('./degreeCourseService');
const authenticationService = require('../authentication/AuthenticationService');

// GET
router.get('/', (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: 'Not authorized, invalid token' })
    } else {
        authenticationService.verifyJWT(req.headers.authorization, (error, result) => {
            if (result) {
                if (result.isAdministrator || result.user == req.params.userID) {
                    degreeCourseService.getDegreeCourses(req.query, (error, result) => {
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
    }
});

router.get('/:_id', (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: 'Not authorized, invalid token' })
    } else {
        authenticationService.verifyJWT(req.headers.authorization, (error, result) => {
            if (result) {
                if (result.isAdministrator || result.user == req.params.userID) {
                    const searchProperty = req.params['_id'];
                    degreeCourseService.findDegreeCourseBy(searchProperty, (error, result) => {
                        if (result) {
                            res.status(200).json(result);
                        } else {
                            res.status(400).json({ error: 'Degree with specified ID not found!' });
                        }
                    });
                }
            } else {
                res.status(401).json({ error: 'Invalid token' });
            }
        })
    }
});

// POST
router.post('/', (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: 'Not authorized, invalid token' })
    } else {
        authenticationService.verifyJWT(req.headers.authorization, (error, result) => {
            if (result) {
                if (result.isAdministrator) {
                    const course = req.body;
                    degreeCourseService.createDegreeCourse(course, (error, result) => {
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

// PUT
router.put('/:degreeCourseID', (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: 'Not authorized, invalid token' })
    } else {
        authenticationService.verifyJWT(req.headers.authorization, (error, result) => {
            if (result) {
                if (result.isAdministrator || result.user == req.params.degreeCourseID) {
                    const parameters = req.params;
                    const toBeUpdated = req.body;
                    degreeCourseService.updateDegreeCourse(toBeUpdated, parameters, (error, result) => {
                        if (result) {
                            res.status(200).json(result);
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

// DELETE
router.delete('/:degreeCourseID', (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: 'Not authorized, invalid token' })
    } else {
        authenticationService.verifyJWT(req.headers.authorization, (error, result) => {
            if (result) {
                if (result.isAdministrator || result.user == req.params.degreeCourseID) {
                    const parameters = req.params;
                    degreeCourseService.deleteDegreeCourse(parameters, (error, result) => {
                        if (result) {
                            res.status(204).json(result);
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