const express = require('express');
const router = express.Router();

const DegreeCourseService = require('./DegreeCourseService');
const DegreeCourseApplicationService = require('../degreeCourseApplication/DegreeCourseApplicationService');
const AuthenticationUtils = require('../utils/AuthenticationUtils');

// Jeder
router.get('/', (req, res) => {
	DegreeCourseService.getDegreeCourses(req.query, (error, result) => {
		if (result) {
			res.status(200).json(result);
		} else {
			res.status(400).json({ error: error });
		}
	});
});

// Jeder
router.get('/:_id', (req, res) => {
	const searchProperty = req.params._id;
	DegreeCourseService.findDegreeCourseBy(searchProperty, (error, result) => {
		if (result) {
			res.status(200).json(result);
		} else {
			res.status(400).json({ error: error });
		}
	});
});

// Nachgelagerte Suche
router.get('/:degreeCourseID/degreeCourseApplications', AuthenticationUtils.isAuthenticated, AuthenticationUtils.isAdministrator, (req, res) => {
	// Funktioniert ist aber langsamer
	//res.redirect('/api/degreeCourseApplications/?degreeCourseID=' + req.params.degreeCourseID);
	DegreeCourseApplicationService.getApplicationsByQuery({ degreeCourseID: req.params.degreeCourseID }, (error, result) => {
		if (result) {
			res.status(200).json(result);
		} else {
			res.status(400).json({ error: error });
		}
	});
});

// Admin
router.post('/', AuthenticationUtils.isAuthenticated, AuthenticationUtils.isAdministrator, (req, res) => {
	const course = req.body;
	DegreeCourseService.createDegreeCourse(course, (error, result) => {
		if (result) {
			res.status(201).json(result);
		} else {
			res.status(400).json({ error: error });
		}
	});
});

// Admin
router.put('/:degreeCourseID', AuthenticationUtils.isAuthenticated, AuthenticationUtils.isAdministrator, (req, res) => {
	const parameters = req.params;
	const toBeUpdated = req.body;
	DegreeCourseService.updateDegreeCourse(toBeUpdated, parameters, (error, result) => {
		if (result) {
			res.status(200).json(result);
		} else {
			res.status(400).json({ error: error });
		}
	});
});

//Admin
router.delete('/:degreeCourseID', AuthenticationUtils.isAuthenticated, AuthenticationUtils.isAdministrator, (req, res) => {
	const parameters = req.params;
	DegreeCourseService.deleteDegreeCourse(parameters, (error, result) => {
		if (result) {
			res.status(204).json(result);
		} else {
			res.status(400).json({ error: error });
		}
	});
});

module.exports = router;
