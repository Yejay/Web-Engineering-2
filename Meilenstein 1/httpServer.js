const dotenv = require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

const routes = require('./endpoints/publicUsers/UserRoute');

const database = require('./database/db');
const port = process.env.PORT;


// Database connection
database.initDB(function (err, db) {
    if (db) {
        console.log(`MongoDB Connected`);
    } else {
        console.log(`MongoDB Connection Failed:`);
    }
});


// Middlewares
app.use('/api/publicUsers', routes);

app.listen(port, () => console.log(`Server started on port ${port}`));
