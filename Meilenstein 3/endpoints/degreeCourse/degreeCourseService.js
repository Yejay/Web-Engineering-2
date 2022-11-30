const DegreeCourseModel = require('./DegreeCourseModel');

const getDegreeCourses = (searchVariable, callback) => {
    DegreeCourseModel.find(searchVariable, (error, degree) => {
        if (error) {
            return callback(error, null);
        } else {
            let mappedResult = degree.map(function (degree) {
                return {
                    "id": degree.id,
                    "name": degree.name,
                    "shortName": degree.shortName,
                    "universityName": degree.universityName,
                    "universityShortName": degree.universityShortName,
                    "departmentName": degree.departmentName,
                    "departmentShortName": degree.departmentShortName
                }
            })
            return callback(null, mappedResult);
        }
    });
}

function findDegreeCourseBy(searchProperty, callback) {
    const query = DegreeCourseModel.findOne({ _id: searchProperty });
    query.exec(function (error, course) {
        if (!course) {
            return callback("Did not find course", null);
        }
        else {
            let mappedResult = {
                "id": course.id,
                "name": course.name,
                "shortName": course.shortName,
                "universityName": course.universityName,
                "universityShortName": course.universityShortName,
                "departmentName": course.departmentName,
                "departmentShortName": course.departmentShortName
            }
            return callback(null, mappedResult);
        }
    });
}

const createDegreeCourse = (course, callback) => {
    if (!course.name || !course.universityName || !course.departmentName) {
        return callback('Please fill all required fields!', null)
    }
    const query = DegreeCourseModel.findOne(course);
    query.exec(async (error, result) => {
        if (result) {
            return callback('Degree course already exists!', null);
        } else {
            const created = await DegreeCourseModel.create(course);
            let mappedResult = {
                "id": created.id,
                "name": created.name,
                "shortName": created.shortName,
                "universityName": created.universityName,
                "universityShortName": created.universityShortName,
                "departmentName": created.departmentName,
                "departmentShortName": created.departmentShortName
            }
            return callback(null, mappedResult);
        }
    });
};

const updateDegreeCourse = (update, parameters, callback) => {
    if (update.name === '' || update.universityName === '' || update.departmentName === '') {
        return callback('Please fill all required fields!', null);
    }
    const query = DegreeCourseModel.findOne({ _id: parameters.degreeCourseID });
    query.exec(async (error, result) => {
        if (error) {
            return callback('Could not update degree course', null);
        } else {
            if (result) {
                const updated = await DegreeCourseModel.findOneAndUpdate({ _id: parameters.degreeCourseID }, update, { new: true });
                let mappedResult = {
                    "id": updated.id,
                    "name": updated.name,
                    "shortName": updated.shortName,
                    "universityName": updated.universityName,
                    "universityShortName": updated.universityShortName,
                    "departmentName": updated.departmentName,
                    "departmentShortName": updated.departmentShortName
                }
                return callback(null, mappedResult);
            } else {
                return callback('Degree course not found!', null);
            }
        }
    });
};

const deleteDegreeCourse = (parameters, callback) => {
    const query = DegreeCourseModel.findOne({ _id: parameters.degreeCourseID });
    query.exec(async (error, result) => {
        if (error) {
            return callback('Could not delete degree course', null);
        } else {
            if (result) {
                const deleted = await DegreeCourseModel.deleteOne({ _id: parameters.degreeCourseID });
                return callback(null, deleted);
            } else {
                return callback('Degree course not found!', null)
            }
        }
    });
};

module.exports = {
    getDegreeCourses,
    findDegreeCourseBy,
    createDegreeCourse,
    updateDegreeCourse,
    deleteDegreeCourse
}