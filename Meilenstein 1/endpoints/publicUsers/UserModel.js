const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        userID: {
            type: String,
            required: [true, 'Please add a name.'],
            unique: true,
        },
        firstName: {
            type: String,
            required: [true, 'Please add a name.'],
        },
        lastName: {
            type: String,
            required: [true, 'Please add a name.'],
        },
        isAdministrator: {
            type: Boolean,
            defualt: false,
        },
        password: {
            type: String,
            required: [true, 'Please enter a password.'],
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', function (next) {
    const user = this;

    console.log(
        'Pre-save: ' + this.password + ' change: ' + this.isModified('password')
    );

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.hash(user.password, 10).then((hashedPassword) => {
        user.password = hashedPassword;
        next();
    }),
        function (err) {
            next(err);
        };
});

userSchema.methods.comparePassword = function (candidatePassword, next) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return next(err);
        else next(null, isMatch);
    });
};

module.exports = mongoose.model('user', userSchema);
