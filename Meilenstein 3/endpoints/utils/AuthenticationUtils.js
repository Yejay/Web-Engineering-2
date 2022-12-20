const jwt = require('jsonwebtoken');
const userService = require('../user/UserService');
const config = require('config');

const isAuthenticated = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(401).json({ error: 'Not authorized, invalid authorization header' });
	} else {
		let token = req.headers.authorization.split(' ')[1];
		var privateKey = config.get('session.tokenKey');
		jwt.verify(token, privateKey, { algorithms: 'HS256' }, (error, payload) => {
			if (error) {
				res.status(401).json({ Error: 'Not Authorized' });
				return;
			}
			if (token) {
				payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('ascii'));
				req.tokenData = payload;
				// req.userID = payload.user;
				return next();
			} else {
				res.status(401).json({ Error: 'Not Authorized' });
				return;
			}
		});
	}
};

// NEW AND IMPROVED BUT NOT TESTED
const isAuthenticated2 = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(401).json({ error: 'Unauthorized: No authorization header provided' });
	}

	const token = req.headers.authorization.split(' ')[1];
	const privateKey = config.get('session.tokenKey');

	try {
		const payload = jwt.verify(token, privateKey, { algorithms: 'HS256' });
		req.tokenData = payload;
		return next();
	} catch (error) {
		return res.status(401).json({ error: 'Unauthorized: Invalid token' });
	}
};

const isAdministrator = (req, res, next) => {
	const tokenUserID = req.tokenData.user;
	userService.findUserBy(tokenUserID, false, (error, result) => {
		if (result) {
			if (result.isAdministrator) {
				return next();
			} else {
				res.status(401).json({ error: 'Not Authorized!' });
			}
		} else {
			res.status(400).json({ error: 'User with specified user ID not found!' });
			return;
		}
	});
};

// NEW AND IMPROVED BUT NOT TESTED
const isAdministrator2 = async (req, res, next) => {
	const tokenUserID = req.tokenData.user;
	try {
		const user = await userService.findUserBy(tokenUserID, false);
		if (!user) {
			return res.status(400).json({ error: 'User with specified user ID not found' });
		}

		if (!user.isAdministrator) {
			return res.status(401).json({ error: 'Unauthorized: Not authorized to access this resource' });
		}

		return next();
	} catch (error) {
		return res.status(500).json({ error: 'Server error: Failed to retrieve user data' });
	}
};

// Für User Route
const isUser = (req, res, next) => {
	if (req.tokenData) {
		if (req.tokenData.isAdministrator || req.tokenData.user == req.params.userID) {
			return next();
		} else {
			res.status(401).json({ error: 'Not Authorized!' });
		}
	} else {
		res.status(401).json({ error: 'Not Authorized!' });
	}
};

// NEW AND IMPROVED BUT NOT TESTED
const isUser2 = (req, res, next) => {
	const { tokenData } = req;
	const { userID } = req.params;
	if (!tokenData) {
		return res.status(401).json({ error: 'Unauthorized: No token provided' });
	}

	if (!tokenData.isAdministrator && tokenData.user !== userID) {
		return res.status(401).json({ error: 'Unauthorized: Not authorized to access this resource' });
	}

	return next();
};

// TYPESCRIPT VERSION
// import express from 'express';

// const isUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     const { tokenData } = req;
//     const { userID } = req.params;
//     if (!tokenData) {
//         return res.status(401).json({ error: 'Unauthorized: No token provided' });
//     }

//     if (!tokenData.isAdministrator && tokenData.user !== userID) {
//         return res.status(401).json({ error: 'Unauthorized: Not authorized to access this resource' });
//     }

//     return next();
// }

module.exports = {
	isAuthenticated,
	isAdministrator,
	isUser,
};
