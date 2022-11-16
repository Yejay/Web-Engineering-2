const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const userService = require('./endpoints/user/UserService');


app.use(express.json());

const userRoutes = require('./endpoints/user/UserRoute');
const publicUserRoutes = require('./endpoints/user/PublicUserRoute');
const authenticationRoutes = require('./endpoints/authentication/AuthenticationRoute');
const degreeCourseRoutes = require('./endpoints/degreeCourse/degreeCourseRoute');

const database = require('./database/db');
const port = process.env.PORT;


// Database connection
database.initDB(function (err, db) {
    if (db) {
        // Create default admin
        userService.createDefaultServerAdmin();
        // HIER AUSGEKAPSELTE ADMIN ERSTELLUNG REIN MACHEN
        console.log(`MongoDB Connected`);
    } else {
        console.log(`MongoDB Connection Failed:`);
    }
});


// Middlewares
app.use('/api/users', userRoutes);
app.use('/api/publicUsers', publicUserRoutes);
app.use('/api/authenticate', authenticationRoutes);
app.use('/api/degreeCourses', degreeCourseRoutes);
// degreeCourse muss hier noch rein

// app.use(function (err, res) {
//     console.error(err.stack);
//     res.status(500).send('SERVER PROBLEM')
// })

// app.use(function (req, res) {
//     res.status(404).send('Not found')
// })

app.listen(port, () => console.log(`Server started on port ${port}`));
