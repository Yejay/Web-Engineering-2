const mongoose = require('mongoose');

const degreeCourseApplicationSchema = new mongoose.Schema(
    {
        applicantUserID: {
            type: String
        },
        courseDegreeID: {
            type: String
        },
        targetPeriodYear: {
            type: Number
        },
        targetPeriodShortName: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('degreeCourseApplication', degreeCourseApplicationSchema);