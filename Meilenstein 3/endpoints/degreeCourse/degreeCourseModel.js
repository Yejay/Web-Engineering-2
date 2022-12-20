const mongoose = require('mongoose');

const degreeCourseShema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a name.'],
		},
		shortName: {
			type: String,
		},
		universityName: {
			type: String,
			required: [true, 'Please add a university name.'],
		},
		universityShortName: {
			type: String,
		},
		departmentName: {
			type: String,
			required: [true, 'Please add a departement name.'],
		},
		departmentShortName: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('degreeCourse', degreeCourseShema);
