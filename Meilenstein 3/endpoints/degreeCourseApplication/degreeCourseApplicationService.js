// Model
const DegreeCourseApplicationModel = require('./degreeCourseApplicationModel');
const DegreeCourseModel = require('../degreeCourse/degreeCourseModel');
const UserModel = require('../user/UserModel');
/**
 * 1. POST Anlegen einer Studienbewerbung durch einen User
 * 
 * Ein Nutzer kann eine Studienbewerbung für sich anlegen. 
 * Dabei wird die User-ID über den Token bestimmt
 * 
 * GET https://localhost/api/degreeCourseApplications/myApplications
 * Authorization: {{manfredToken}}
 * 
 * Eigentlich eher das als Beispiel nehemen, das von oben ist aus Meilenstein 3 vorgaben, also ein Test.
 * 
 * POST https://localhost/api/degreeCourseApplications
 * Authorization: {{manfredToken}}
 * Content-Type: application/json
 * 
 * {
 *     "degreeCourseID": "{{degreeCourseID}}",
 *     "targetPeriodYear": 2024,
 *     "targetPeriodShortName": "WiSe"
 * }
 */


/**
 * 2. GET Suche nach den Studienbewerbungen des aktuellen Nutzers
 * In der Web-Anwendung soll der Studierende seine eigenen Studienbewerbungen ansehen können.
 * Hierzu soll der folgende Request umgesetzt werden:
 * 
 * GET https://localhost/api/degreeCourseApplications?applicantUserID=manfred
 * Authorization: {{adminToken}}
 * 
 * Diese Suche sollen nur User durchführen können, die Administrator sind.
 */


/**
 * 3. GET Suche nach Studienbewerbungen für einen Studiengang
 * Der Administrator soll die Möglichkeit haben, 
 * die Bewerbungen für einen bestimmten Studiengang abzurufen.
 * 
 * GET https://localhost/api/degreeCourseApplications?courseDegreeID={{degreeCourseID}}
 * Authorization: {{adminToken}}
 * 
 * Auch diese Suche sollen nur Administratoren ausführen können.
 */


/**
 * 4. PUT Updaten einer bereits existierenden Bewerbung
 * 
 * PUT https://localhost/api/degreeCourseApplications/{{applicationID}}
 * Authorization: {{adminToken}}
 * Content-Type: application/json
 * 
 * {
 *    "targetPeriodYear": 2025
 * }
 */

/**
 * 5. DELETE Löschen der Bewerbung
 * 
 * DELETE  https://localhost/api/degreeCourseApplications/{{applicationID}}
 * Authorization: {{adminToken}}
 */
// -------------------------------------------------------------------------

const createApplication = async (application, authorizedUserID, callback) => {
    /**
     * 1. if not admin user set applicant user id to authorized user id CHECK
     * 2. check if required fields are set CHECK
     * 3. check if target period year is valid CHECK
     * 4. check if application for this user and degree already exists
     * 5. check if degree exists
     * 6. check if user exists
     */
    if (authorizedUserID != null) {
        application.applicantUserID = authorizedUserID;
    }

    if (!application.applicantUserID || !application.degreeCourseID || !application.targetPeriodYear || !application.targetPeriodShortName) {
        return callback('Please fill all required fields!', null);
    }

    const currentYear = new Date().getFullYear;
    if (application.targetPeriodYear < currentYear) {
        return callback('Invalid year!', null);
    }
    const user = await UserModel.findOne(application.applicantUserID);
    if (user == null) {
        return callback('User does not exist!', null);
    }
    const degreeCourse = await DegreeCourseModel.findOne({ userID: application.degreeCourseID });
    if (!degreeCourse) {
        return callback('Degree course does not exist!', null);
    }

    DegreeCourseApplicationModel.findOne(application).exec(async (error, result) => {
        if (result) {
            return callback('Application already exists!', null);
        } else {
            const createdApplication = await DegreeCourseApplicationModel.create(application);
            return callback(null, createdApplication);
        }
    })
}

const getCurrentUsersApplications = (currentUserID, callback) => {
    DegreeCourseApplicationModel.find(currentUserID, (error, result) => {
        if (error) {
            return callback(error, null);
        } else {
            // object property mapping / mapped result
            return callback(null, result);
        }
    });
}

const getApplicationsByQuery = (query, callback) => {
    DegreeCourseApplicationModel.find(query, (error, result) => {
        if (error) {
            return callback(error, null);
        } else {
            // object property mapping / mapped result
            return callback(null, result);
        }
    });
}

// export
module.exports = {
    getCurrentUsersApplications,
    getApplicationsByQuery,
    createApplication
}

