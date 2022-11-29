const express = require('express');

// FOR SSL
const https = require('https');
const path = require('path');
const fs = require('fs');


const dotenv = require('dotenv').config();
const app = express();
const userService = require('./endpoints/user/UserService');


app.use(express.json());

const userRoutes = require('./endpoints/user/UserRoute');
const publicUserRoutes = require('./endpoints/user/PublicUserRoute');
const authenticationRoutes = require('./endpoints/authentication/AuthenticationRoute');
const degreeCourseRoutes = require('./endpoints/degreeCourse/degreeCourseRoute');
const degreeCourseApplicationRoutes = require('./endpoints/degreeCourseApplication/degreeCourseApplicationRoute');

const database = require('./database/db');
const httpPort = process.env.HTTPPORT;
const httpsPort = process.env.HTTPSPORT;

// SSL

// Unterschied zu unten?
// const key = fs.readFileSync('./certificates/key.pem');
// const cert = fs.readFileSync('./certificates/cert.pem');

const sslServer = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, 'certificates', 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'certificates', 'cert.pem')),
    }, app
)



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
app.use('/api/degreeCourseApplications', degreeCourseApplicationRoutes);
// app.use('/', (req, res, next) => { res.send('this is a secure server') });
// degreeCourse muss hier noch rein

// app.use(function (err, res) {
//     console.error(err.stack);
//     res.status(500).send('SERVER PROBLEM')
// })

// app.use(function (req, res) {
//     res.status(404).send('Not found')
// })


sslServer.listen(httpsPort, () => console.log(`Secure server on port ${httpsPort}`));
// app.listen(httpPort, () => console.log(`Server started on port ${httpPort}`));
