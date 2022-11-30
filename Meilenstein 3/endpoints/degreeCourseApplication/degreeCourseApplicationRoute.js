const express = require('express');
const router = express.Router();

const AuthenticationUtils = require('../utils/AuthenticationUtils');
const DegreeCourseApplicationService = require('./DegreeCourseApplicationService');

router.post('/', AuthenticationUtils.isAuthenticated, AuthenticationUtils.isAuthorized, (req, res) => {
    const application = req.body;
    const authorizedUserID = req.userID
    DegreeCourseApplicationService.createApplication(application, authorizedUserID, (error, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ error: error });
        }
    });
});

router.get('/myApplications', AuthenticationUtils.isAuthenticated, AuthenticationUtils.isAuthorized, (req, res) => {
    const currentUserID = req.userID;
    DegreeCourseApplicationService.getCurrentUsersApplications(currentUserID, (error, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ error: error });
        }
    });
});

router.get('/', AuthenticationUtils.isAuthenticated, AuthenticationUtils.isAuthorized, (req, res) => {
    const query = req.query;
    DegreeCourseApplicationService.getApplicationsByQuery(query, (error, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ error: error });
        }
    });
});

router.get('/:id', AuthenticationUtils.isAuthenticated, AuthenticationUtils.isAuthorized, (req, res) => {
    const query = req.params.id;
    DegreeCourseApplicationService.getApplicationsByQuery(query, (error, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ error: error });
        }
    });
});

router.put('/:id', AuthenticationUtils.isAuthenticated, AuthenticationUtils.isAuthorized, (req, res) => {
    const parameters = req.params;
    const toBeUpdated = req.body;
    DegreeCourseApplicationService.updateApplication(toBeUpdated, parameters, (error, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: error });
        }
    });
});

router.delete('/:id', AuthenticationUtils.isAuthenticated, AuthenticationUtils.isAuthorized, (req, res) => {
    const parameters = req.params;
    DegreeCourseApplicationService.deleteApplication(parameters, (error, result) => {
        if (result) {
            res.status(204).json(result);
        } else {
            res.status(404).json({ error: error });
        }
    });
});

module.exports = router;