const UserModel = require('./UserModel');
const bcrypt = require("bcryptjs");

const getUsers = async () => {
    const users = await UserModel.find();
    return users;
};

// Version one
const registerUser = async (user, callback) => {
    if (!user.userID || !user.firstName || !user.lastName || !user.password) {
        return callback(null, 'Please insert the required fields!')
    }
    if (user.userID === '' || user.firstName === '' || user.lastName === '' || user.password === '') {
        return callback(null, 'Please fill all required fields!');
    }
    const duplicate = UserModel.findOne({ userID: user.userID });
    // params error and result have to be in that order
    duplicate.exec(async (error, result) => {
        if (error) {
            return callback('Could not create user!')
        } else {
            if (result) {
                return callback('User already exists!', null);
            } else {
                const created = await UserModel.create(user);
                return callback(null, created);
            }
        }
    });
};
// Version 2
// const registerUser = async (req, res) => {
//     const user = req.body;
//     const created = await UserModel.create(user, (err, user) => {
//         if (err) return handleError(err);
//     });
//     return created;
// };

const findUser = async (userId, callback) => {
    const user = await UserModel.findOne({ userID: userId });
    return user;
};

const updateFirstAndLastName = async (update, userId, callback) => {
    if (update.userID === '' || update.firstName === '' || update.lastName === '' || update.password === '') {
        return callback(null, 'Please fill all required fields!');
    }
    const duplicate = UserModel.findOne({ userID: userId });

    duplicate.exec(async (error, result) => {
        if (result) {
            if (update.password) {
                update.password = await bcrypt.hash(update.password, 10);
            }
            const updated = await UserModel.findOneAndUpdate({ userID: userId }, update, { new: true });
            return callback(updated, null);
        } else {
            return callback(null, 'User not found!');
        }
    });
};

const deleteUser = async (userId, callback) => {
    const duplicate = UserModel.findOne({ userID: userId });
    duplicate.exec(async (error, result) => {
        if (result) {
            const deleted = await UserModel.deleteOne({ userID: userId });
            return callback(deleted, null);
        } else {
            return callback(null, 'User not found!')
        }

    });
};

module.exports = {
    getUsers,
    findUser,
    updateFirstAndLastName,
    registerUser,
    deleteUser,
};
