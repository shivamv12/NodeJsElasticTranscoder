require('colors');
const morgan = require('morgan');
const express = require('express');
const routerApi = require('./routes/api');
const fileUpload = require('express-fileupload');
require('dotenv').config({path: './configuration/.env'});
const {application} = require('./configuration/appConfiguration');

/** Initialize Express App */
const app = express();

/** Apply some middlewares */
app.use(fileUpload());
app.use(morgan(application.log));
app.use(express.json()); // {limit: '10kb'}
app.use(express.urlencoded({extended: true}));

/** Calling Routes */
app.use('/', routerApi);

module.exports = app;
