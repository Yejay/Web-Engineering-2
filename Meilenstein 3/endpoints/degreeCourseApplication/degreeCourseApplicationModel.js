const mongoose = require('mongoose');

const degreeCourseApplicationSchema = new mongoose.Schema(
    {
        applicantUserID: {
            type: String,
            required: [true, 'Please add an applicant user ID.']
        },
        degreeCourseID: {
            type: String,
            required: [true, 'Please add a degree course ID.']
        },
        targetPeriodYear: {
            type: Number,
            required: [true, 'Please add a target period year.']
        },
        targetPeriodShortName: {
            type: String,
            required: [true, 'Please add a target period short name.']
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('degreeCourseApplication', degreeCourseApplicationSchema);