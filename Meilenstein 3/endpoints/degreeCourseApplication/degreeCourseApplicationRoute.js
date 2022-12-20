const express = require('express');
const router = express.Router();

const AuthenticationUtils = require('../utils/AuthenticationUtils');
const DegreeCourseApplicationService = require('./DegreeCourseApplicationService');

// Admin und User
router.post('/', AuthenticationUtils.isAuthenticated, (req, res) => {
	if (req.tokenData.isAdministrator) {
		DegreeCourseApplicationService.createApplication(req.body, req.tokenData.user, (error, result) => {
			if (result) {
				res.status(201).json(result);
			} else {
				res.status(400).json({ error: error });
			}
		});
	} else if (!req.body.applicantUserID) {
		DegreeCourseApplicationService.createApplication(req.body, req.tokenData.user, (error, result) => {
			if (result) {
				res.status(201).json(result);
			} else {
				res.status(400).json({ error: error });
			}
		});
	} else {
		// was 400 before, but one test failed. needs to be checked
		res.status(403).json({ error: 'Not Authorized!' });
	}
});

// CHATGPT 1
// router.post('/', AuthenticationUtils.isAuthenticated, (req, res) => {
//     // Check if the user is an administrator or the applicantUserID matches the authenticated user
//     if (req.tokenData.isAdministrator || req.body.applicantUserID === req.tokenData.user) {
//         // Call the createApplication method
//         DegreeCourseApplicationService.createApplication(req.body, req.tokenData.user, (error, result) => {
//             if (result) {
//                 res.status(201).json(result);
//             } else {
//                 res.status(400).json({ error: error });
//             }
//         });
//     } else {
//         res.status(403).json({ error: 'Not Authorized to create application for other users!' });
//     }
// });

// CHATGPT 2
// router.post('/', AuthenticationUtils.isAuthenticated, (req, res) => {
//     // Check if the user is an administrator
//     req.check('isAdministrator').equals(true);

//     // Get any validation errors
//     const errors = req.validationErrors();

//     if (errors) {
//         res.status(400).json({ error: errors });
//     } else {
//         // Call the createApplication method
//         DegreeCourseApplicationService.createApplication(req.body, req.tokenData.user, (error, result) => {
//             if (result) {
//                 res.status(201).json(result);
//             } else {
//                 res.status(400).json({ error: error });
//             }
//         });
//     }
// });

// CHATGPT 3
// router.post('/', AuthenticationUtils.isAuthenticated, (req, res) => {
//     const user = req.tokenData.user;
//     const isAdmin = req.tokenData.isAdministrator;
//     const applicantUserID = req.body.applicantUserID;

//     if (!isAdmin && applicantUserID) {
//         return res.status(403).json({ error: 'Not Authorized!' });
//     }

//     DegreeCourseApplicationService.createApplication(req.body, user, (error, result) => {
//         if (result) {
//             return res.status(201).json(result);
//         } else {
//             return res.status(400).json({ error: error });
//         }
//     });
// });

// User
router.get('/myApplications', AuthenticationUtils.isAuthenticated, (req, res) => {
	const currentUserID = req.tokenData.user;
	DegreeCourseApplicationService.getCurrentUsersApplications(currentUserID, (error, result) => {
		if (result) {
			res.status(200).json(result);
		} else {
			res.status(400).json({ error: error });
		}
	});
});

// Admin
router.get('/', AuthenticationUtils.isAuthenticated, AuthenticationUtils.isAdministrator, (req, res) => {
	const query = req.query;
	DegreeCourseApplicationService.getApplicationsByQuery(query, (error, result) => {
		if (result) {
			res.status(200).json(result);
		} else {
			res.status(400).json({ error: error });
		}
	});
});

// Admin
router.get('/:id', AuthenticationUtils.isAuthenticated, AuthenticationUtils.isAdministrator, (req, res) => {
	const query = req.params.id;
	DegreeCourseApplicationService.getApplicationsByQuery(query, (error, result) => {
		if (result) {
			res.status(200).json(result);
		} else {
			res.status(400).json({ error: error });
		}
	});
});

// Admin und User
router.put('/:id', AuthenticationUtils.isAuthenticated, AuthenticationUtils.isAdministrator, (req, res) => {
	const parameters = req.params;
	const toBeUpdated = req.body;
	DegreeCourseApplicationService.updateApplication(toBeUpdated, parameters, (error, result) => {
		if (result) {
			res.status(200).json(result);
		} else {
			res.status(400).json({ error: error });
		}
	});
});

// Admin und User
router.delete('/:id', AuthenticationUtils.isAuthenticated, AuthenticationUtils.isAdministrator, (req, res) => {
	const parameters = req.params;
	DegreeCourseApplicationService.deleteApplication(parameters, (error, result) => {
		if (result) {
			res.status(204).json(result);
		} else {
			res.status(400).json({ error: error });
		}
	});
});

module.exports = router;
