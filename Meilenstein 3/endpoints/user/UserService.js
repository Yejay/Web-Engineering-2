const UserModel = require('./UserModel');
const bcrypt = require('bcryptjs');

const createDefaultServerAdmin = async () => {
	const adminUser = new UserModel();
	adminUser.userID = 'admin';
	adminUser.firstName = 'Default Administrator Account';
	adminUser.lastName = 'Default Administrator Account';
	adminUser.isAdministrator = true;
	adminUser.password = '123';

	const query = UserModel.findOne({ userID: 'admin' });
	query.exec(async (error, result) => {
		if (error) {
			return callback('Could not create admin!');
		} else {
			if (result) {
				console.log('--------------------------------------------------------------------------');
				console.log('Admin already exists!');
				console.log('--------------------------------------------------------------------------');
			} else {
				console.log('--------------------------------------------------------------------------');
				console.log('Do not have admin account yet. Create it with default password');
				console.log('--------------------------------------------------------------------------');
				await UserModel.create(adminUser);
			}
		}
	});
};

const getUsers = async (includePassword) => {
	try {
		if (includePassword) {
			const users = await UserModel.find();
			return users;
		} else {
			const users = await UserModel.find().select('-password');
			return users;
		}
	} catch (error) {
		return error;
	}
};

// NEW NOT TESTED
/**
 * In a MongoDB query, the projection is a way to specify which fields to include or exclude in the returned documents.
 * The projection is specified as a second argument to the find method, and it is an object that contains the field names and their inclusion or exclusion values.
 * For example, if you want to exclude the password field from the returned documents, you can specify the projection as { password: 0 }.
 * This tells MongoDB to include all fields in the returned documents except for the password field.
 * On the other hand, if you want to only include the name and email fields in the returned documents, you can specify the projection as { name: 1, email: 1 }.
 * This tells MongoDB to only include the name and email fields in the returned documents and exclude all other fields.
 * The projection is a useful feature because it allows you to control which fields are included in the returned documents,
 * which can save network bandwidth and improve performance when working with large datasets.
 * It also provides a way to protect sensitive data, such as password hashes, from being returned by the query.
 */
const getUsers2 = async (includePassword) => {
	try {
		const projection = {};
		if (!includePassword) {
			projection.password = 0;
		}

		const users = await UserModel.find({}, projection);
		return users;
	} catch (error) {
		throw new Error(`Failed to get users: ${error.message}`);
	}
};

function findUserBy(searchUserID, includePassword, callback) {
	let query;
	if (includePassword) {
		query = UserModel.findOne({ userID: searchUserID });
	} else {
		query = UserModel.findOne({ userID: searchUserID }).select('-password');
	}
	query.exec(function (err, user) {
		if (user) {
			return callback(null, user);
		} else {
			return callback('Did not find user for userID: ', null);
		}
	});
}

const registerUser = async (user, includePassword, callback) => {
	if (!user.userID || !user.firstName || !user.lastName || !user.password) {
		return callback('Please insert the required fields!', null);
	}
	const query = UserModel.findOne({ userID: user.userID });
	query.exec(async (error, result) => {
		if (error) {
			return callback('Could not create user!');
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

const updateUser = async (update, userId, includePassword, callback) => {
	const query = UserModel.findOne({ userID: userId });

	query.exec(async (error, result) => {
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
			return callback('User not found!', null);
		}
	});
};

const deleteUser = (userId, callback) => {
	const query = UserModel.findOne({ userID: userId });
	query.exec(async (error, result) => {
		if (result) {
			const deleted = await UserModel.deleteOne({ userID: userId });
			return callback(null, deleted);
		} else {
			return callback('User not found!', null);
		}
	});
};

module.exports = {
	createDefaultServerAdmin,
	getUsers,
	findUserBy,
	registerUser,
	updateUser,
	deleteUser,
};
