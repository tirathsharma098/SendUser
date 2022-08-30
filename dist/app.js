"use strict";
const express = require('express');
const app = express();
const path = require('path');
const UserRoute = require('./routes/user');
const dotenv = require('dotenv');
app.use(express.urlencoded({ extended: true }));
dotenv.config({ path: path.join(__dirname, '../.env') });
const MAIN_PORT = process.env.MAIN_PORT;
app.get('/', (req, res) => {
    res.send('Hey Lets make it together');
});
app.use('/user', UserRoute);
try {
    app.listen(MAIN_PORT, () => console.log(`Listing to port ${MAIN_PORT}`));
}
catch (e) {
    console.error('>> ERROR OCCURED WHILE LISTINING: ', e);
}
