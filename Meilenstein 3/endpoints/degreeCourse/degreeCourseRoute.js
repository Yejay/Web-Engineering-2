const express = require('express');
const router = express.Router();

const degreeCourseService = require('./degreeCourseService');
const authenticationService = require('../authentication/AuthenticationService');


router.get('/', (req, res) => {
    degreeCourseService.getDegreeCourses(req.query, (error, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(400).json(error);
        }
    });
});


router.get('/:_id', (req, res) => {
    const searchProperty = req.params['_id'];
    degreeCourseService.findDegreeCourseBy(searchProperty, (error, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ error: 'Degree with specified ID not found!' });
        }
    });
});


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


router.put('/:degreeCourseID', (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: 'Not authorized, invalid token' })
    } else {
        authenticationService.verifyJWT(req.headers.authorization, (error, result) => {
            if (result) {
                if (result.isAdministrator) {
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


router.delete('/:degreeCourseID', (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: 'Not authorized, invalid token' })
    } else {
        authenticationService.verifyJWT(req.headers.authorization, (error, result) => {
            if (result) {
                if (result.isAdministrator) {
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