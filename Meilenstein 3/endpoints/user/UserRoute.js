const express = require('express');
const router = express.Router();
const userService = require('./UserService');
const AuthenticationUtils = require('../utils/AuthenticationUtils');

// Admin
router.get('/', AuthenticationUtils.isAuthenticated, AuthenticationUtils.isAdministrator, async (req, res) => {
	const users = await userService.getUsers(false);
	res.status(200).json(users);
});

// Admin und User
router.get('/:userID', AuthenticationUtils.isAuthenticated, AuthenticationUtils.isUser, (req, res) => {
	const userId = req.params.userID;
	userService.findUserBy(userId, false, (error, result) => {
		if (result) {
			res.status(200).json(result);
		} else {
			res.status(400).json({ error: 'User with specified user ID not found!' });
		}
	});
});

// Admin
router.post('/', AuthenticationUtils.isAuthenticated, AuthenticationUtils.isAdministrator, (req, res) => {
	const user = req.body;
	userService.registerUser(user, false, (error, result) => {
		if (result) {
			res.status(201).json(result);
		} else {
			res.status(400).json({ error: error });
		}
	});
});

// Admin und User
router.put('/:userID', AuthenticationUtils.isAuthenticated, AuthenticationUtils.isUser, async (req, res) => {
	const userId = req.params.userID;
	const toBeUpdated = req.body;
	userService.updateUser(toBeUpdated, userId, false, (error, result) => {
		if (result) {
			res.status(200).json(result);
		} else {
			if (error) {
				res.status(400).json({ error: error });
			}
		}
	});
});

// Admin
router.delete('/:userID', AuthenticationUtils.isAuthenticated, AuthenticationUtils.isAdministrator, async (req, res) => {
	const userId = req.params.userID;
	await userService.deleteUser(userId, (error, result) => {
		if (result) {
			res.status(204).json();
			console.log(`User with ID: (${userId}) was successfully deleted.\n`);
		} else {
			res.status(400).json({ error: error });
		}
	});
});

module.exports = router;
