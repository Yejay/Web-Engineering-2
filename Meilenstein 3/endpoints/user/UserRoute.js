const express = require('express');
const router = express.Router();
const userService = require('./UserService');
const authenticationUtils = require('../utils/AuthenticationUtils');

router.get('/', authenticationUtils.isAuthenticated, authenticationUtils.isAuthorized, async (req, res) => {
    const users = await userService.getUsers(false);
    res.status(200).json(users);
});

router.get('/:userID', authenticationUtils.isAuthenticated, authenticationUtils.isAuthorized, (req, res) => {
    const userId = req.params.userID;
    userService.findUserBy(userId, false, (error, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ error: 'User with specified user ID not found!' });
        }
    });
});

router.post('/', authenticationUtils.isAuthenticated, authenticationUtils.isAuthorized, (req, res) => {
    const user = req.body;
    userService.registerUser(user, false, (error, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ error: error });
        }
    });
});

router.put('/:userID', authenticationUtils.isAuthenticated, authenticationUtils.isAuthorized, async (req, res) => {
    const userId = req.params.userID;
    const toBeUpdated = req.body;
    userService.updateUser(toBeUpdated, userId, false, (error, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            if (error) {
                res.status(404).json({ error: error });
            }
        }
    });
});

router.delete('/:userID', authenticationUtils.isAuthenticated, authenticationUtils.isAuthorized, async (req, res) => {
    const userId = req.params.userID;
    await userService.deleteUser(userId, (error, result) => {
        if (result) {
            res.status(204).json();
            console.log(`User with ID: (${userId}) was successfully deleted.\n`);
        } else {
            res.status(404).json({ error: error });
        }
    });
});

module.exports = router;
