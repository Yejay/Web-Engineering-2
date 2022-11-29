// express
const express = require('express');
// router
const router = express.Router();
// services
const degreeCourseApplicationService = require('./degreeCourseApplicationService');
const authenticationService = require('../authentication/AuthenticationService');

// routes

// POST Anlegen einer Studienbewerbung durch einen User
router.post('/', (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: 'Not authorized, invalid token' });
    } else {
        authenticationService.verifyJWT(req.headers.authorization, (error, result) => {
            if (result) {
                const application = req.body;
                const authorizedUserID = result;
                degreeCourseApplicationService.createApplication(application, authorizedUserID, (error, result) => {
                    if (result) {
                        res.status(200).json(result);
                    } else {
                        res.status(400).json(error);
                    }
                });
            } else {
                res.status(401).json({ error: 'Invalid token' });
            }
        });
    }
});

// GET Suche nach den Studienbewerbungen des aktuellen Nutzers
router.get('/myApplications', (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: 'Not authorized, invalid token!' });
    } else {
        authenticationService.verifyJWT(req.headers.authorization, (error, result) => {
            if (result) {
                const currentUserID = result.user;
                degreeCourseApplicationService.getCurrentUsersApplications(currentUserID, (error, result) => {
                    if (result) {
                        res.status(200).json(result);
                    } else {
                        res.status(400).json(error);
                    }
                });
            } else {
                res.status(401).json({ error: 'Invalid token!' });
            }
        });
    }

});

// GET Suche nach Studienbewerbungen für einen Studiengang
// Suche nach den Studienbewerbungen für einen beliebigen Nutzer
router.get('/', (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: 'Not authorized, invalid token!' });
    } else {
        authenticationService.verifyJWT(req.headers.authorization, (error, result) => {
            if (result) {
                if (result.isAdministrator) {
                    const query = req.query;
                    degreeCourseApplicationService.getApplicationsByQuery(query, (error, result) => {
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
})



// PUT Updaten einer bereits existierenden Bewerbung
router.put('/:id', (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: 'Not authorized, invalid token' })
    } else {
        authenticationService.verifyJWT(req.headers.authorization, (error, result) => {
            if (result) {
                if (result.isAdministrator) {
                    const parameters = req.params;
                    const toBeUpdated = req.body;
                    degreeCourseApplicationService.updateApplication(toBeUpdated, parameters, (error, result) => {
                        if (result) {
                            res.status(200).json(result);
                        } else {
                            res.status(404).json({ error: error });
                        }
                    });
                }
            } else {
                res.status(401).json({ error: 'Invalid token' });
            }
        })
    }
});

// DELETE Löschen der Bewerbung
router.delete('/:id', (req, res) => {
    if (!req.headers.authorization) {
        res.status(401).json({ error: 'Not authorized, invalid token' })
    } else {
        authenticationService.verifyJWT(req.headers.authorization, (error, result) => {
            if (result) {
                if (result.isAdministrator) {
                    const parameters = req.params;
                    degreeCourseApplicationService.deleteApplication(parameters, (error, result) => {
                        if (result) {
                            res.status(204).json(result);
                        } else {
                            res.status(404).json({ error: error });
                        }
                    });
                }
            } else {
                res.status(401).json({ error: 'Invalid token' });
            }
        })
    }
});



// export
module.exports = router;