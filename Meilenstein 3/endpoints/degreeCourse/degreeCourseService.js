const DegreeCourseModel = require('./degreeCourseModel');

const getDegreeCourses = (searchVariable, callback) => {
    const users = DegreeCourseModel.find(searchVariable, (error, degree) => {
        if (error) {
            return callback(error, null);
        } else {
            return callback(null, degree);
        }
    });
}

function findDegreeCourseBy(searchProperty, callback) {
    const query = DegreeCourseModel.findOne({ _id: searchProperty });
    query.exec(function (error, course) {
        if (error) {
            return callback("Did not find course", null);
        }
        else {
            return callback(null, course);
        }
    });
}

const createDegreeCourse = (course, callback) => {
    console.log(course);
    if (!course.name || !course.universityName || !course.departmentName) {
        return callback('Please insert the required fields!', null)
    }
    if (course.name === '' || course.universityName === '' || course.departmentName === '') {
        return callback('Please fill all required fields!', null);
    }
    const query = DegreeCourseModel.findOne(course);
    query.exec(async (error, result) => {
        if (result) {
            return callback('Degree course already exists!', null);
        } else {
            const created = await DegreeCourseModel.create(course);
            return callback(null, created);
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
                return callback(null, updated);
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