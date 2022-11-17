const UserModel = require('./UserModel');
const bcrypt = require("bcryptjs");


const createDefaultServerAdmin = async () => {
    var adminUser = new UserModel();
    adminUser.userID = "admin"
    adminUser.firstName = 'Default Administrator Account'
    adminUser.lastName = 'Default Administrator Account'
    adminUser.isAdministrator = true
    adminUser.password = "123"

    const query = UserModel.findOne({ userID: "admin" });
    query.exec(async (error, result) => {
        if (error) {
            return callback('Could not create admin!');
        } else {
            if (result) {
                console.log('Admin already exists!');
            } else {
                console.log("Do not have admin account yet. Create it with default password");
                await UserModel.create(adminUser);
            }
        }
    });
}

const getUsers = async (includePassword) => {
    try {
        if (includePassword) {
            const users = await UserModel.find()
            return users;

        } else {
            const users = await UserModel.find().select('-password');
            return users;
        }
    } catch (e) {
        return e;
    }
};

function findUserBy(searchUserID, includePassword, callback) {
    let query;
    if (includePassword) {
        query = UserModel.findOne({ userID: searchUserID })
    } else {
        query = UserModel.findOne({ userID: searchUserID }).select('-password');
    }
    query.exec(function (err, user) {
        if (err) {
            return callback("Did not find user for userID: ");
        }
        else {
            console.log('Found userID: ' + searchUserID);
            return callback(null, user);
        }
    });
}

const registerUser = async (user, includePassword, callback) => {
    if (!user.userID || !user.firstName || !user.lastName || !user.password) {
        return callback(null, 'Please insert the required fields!')
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
                if (includePassword) {
                    return callback(null, created);
                } else {
                    return callback(null, await UserModel.findOne({ userID: created.userID }).select('-password'));
                }
            }
        }
    });
};

const updateFirstAndLastName = async (update, userId, includePassword, callback) => {
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
            if (includePassword) {
                return callback(null, updated);

            } else {
                return callback(null, await UserModel.findOne({ userID: updated.userID }).select('-password'));
            }
        } else {
            return callback(null, 'User not found!');
        }
    });
};

const deleteUser = (userId, callback) => {
    const duplicate = UserModel.findOne({ userID: userId });
    duplicate.exec(async (error, result) => {
        if (result) {
            const deleted = await UserModel.deleteOne({ userID: userId });
            return callback(null, deleted);
        } else {
            return callback('User not found!', null)
        }

    });
};

module.exports = {
    createDefaultServerAdmin,
    getUsers,
    findUserBy,
    updateFirstAndLastName,
    registerUser,
    deleteUser,
};
