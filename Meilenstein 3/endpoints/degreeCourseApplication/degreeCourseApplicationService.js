const DegreeCourseApplicationModel = require('./DegreeCourseApplicationModel');
const DegreeCourseModel = require('../degreeCourse/DegreeCourseModel');
const UserModel = require('../user/UserModel');

const createApplication = async (application, authorizedUserID, callback) => {
    if (application.applicantUserID == null) {
        application.applicantUserID = authorizedUserID;
    }

    if (!application.applicantUserID || !application.degreeCourseID || !application.targetPeriodYear || !application.targetPeriodShortName) {
        return callback('Please fill all required fields!', null);
    }

    const currentYear = new Date().getFullYear();
    if (application.targetPeriodYear < currentYear) {
        return callback('Invalid year!', null);
    }

    try {
        const user = await UserModel.findOne({ userID: application.applicantUserID });
        if (user == null) {
            return callback('User does not exist!', null);
        }

        const degreeCourse = await DegreeCourseModel.findOne({ _id: application.degreeCourseID });
        if (degreeCourse == null) {
            return callback('Degree course does not exist!', null);
        }

        DegreeCourseApplicationModel.findOne(application).exec(async (error, result) => {
            if (result) {
                return callback('Application already exists!', null);
            } else {
                const createdApplication = await DegreeCourseApplicationModel.create(application);
                let mappedResult = {
                    "id": createdApplication.id,
                    "applicantUserID": createdApplication.applicantUserID,
                    "degreeCourseID": createdApplication.degreeCourseID,
                    "targetPeriodYear": createdApplication.targetPeriodYear,
                    "targetPeriodShortName": createdApplication.targetPeriodShortName,
                }
                return callback(null, mappedResult);
            }
        });
    } catch (error) {
        return callback('Something went horribly wrong!', null)
    }
}

const getCurrentUsersApplications = (currentUserID, callback) => {
    DegreeCourseApplicationModel.find({ applicantUserID: currentUserID }, (error, result) => {
        if (error) {
            return callback(error, null);
        } else {
            let mappedResult = result.map(function (result) {
                return {
                    "id": result.id,
                    "applicantUserID": result.applicantUserID,
                    "degreeCourseID": result.degreeCourseID,
                    "targetPeriodYear": result.targetPeriodYear,
                    "targetPeriodShortName": result.targetPeriodShortName,
                }
            })
            return callback(null, mappedResult);
        }
    });
}

const getApplicationsByQuery = (query, callback) => {
    DegreeCourseApplicationModel.find(query, (error, result) => {
        if (error) {
            return callback('Application not found!', null);
        } else {
            let mappedResult = result.map(function (result) {
                return {
                    "id": result.id,
                    "applicantUserID": result.applicantUserID,
                    "degreeCourseID": result.degreeCourseID,
                    "targetPeriodYear": result.targetPeriodYear,
                    "targetPeriodShortName": result.targetPeriodShortName,
                }
            })
            return callback(null, mappedResult);
        }
    });
}

const updateApplication = (update, parameters, callback) => {
    if (update.name === '' || update.universityName === '' || update.departmentName === '') {
        return callback('Please fill all required fields!', null);
    }
    const query = DegreeCourseApplicationModel.findOne(parameters);
    query.exec(async (error, result) => {
        if (error) {
            return callback('Could not update degree course', null);
        } else {
            if (result) {
                const updated = await DegreeCourseApplicationModel.findOneAndUpdate(parameters, update, { new: true });
                let mappedResult = {
                    "id": updated.id,
                    "applicantUserID": updated.applicantUserID,
                    "degreeCourseID": updated.degreeCourseID,
                    "targetPeriodYear": updated.targetPeriodYear,
                    "targetPeriodShortName": updated.targetPeriodShortName,
                }
                return callback(null, mappedResult);
            } else {
                return callback('Application not found!', null);
            }
        }
    });
};

const deleteApplication = (parameters, callback) => {
    const query = DegreeCourseApplicationModel.findOne({ _id: parameters.id });
    query.exec(async (error, result) => {
        if (error) {
            return callback('Could not delete application', null);
        } else {
            if (result) {
                const deleted = await DegreeCourseApplicationModel.deleteOne({ _id: parameters.id });
                return callback(null, deleted);
            } else {
                return callback('Application not found!', null)
            }
        }
    });
};

module.exports = {
    getCurrentUsersApplications,
    getApplicationsByQuery,
    createApplication,
    updateApplication,
    deleteApplication
}

