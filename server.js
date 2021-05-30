require('colors');
const express = require('express');
require('dotenv').config({path: './configuration/.env'});
const {application} = require('./configuration/appConfigurer');
const dbConnect = require('./configuration/database');

/** Initialize Express App */
const app = express();

/** Database Connecting */
dbConnect();

/** Calling Routes */
app.use('/', require('./routes/api'));

/** Creating a Server */
const PORT = application.port || 5000;

const server = app.listen(PORT, () => {
  console.log(
    '\nServer running at ' +
      `http://${application.host}:${PORT}/`.green.underline.bold +
      ` in ${application.env} mode!`
  );
});

/** Handle Unhandled Exception */
process.on('unhandledRejection', (err, promises) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
