require('colors');
const express = require('express');
require('dotenv').config({path: './configuration/.env'});
const {application} = require('./configuration/appConfigurer');

/** Initialize Express App */
const app = express();

const PORT = application.PORT || 5000;

app.get('/', (req, res) =>
  res.json({success: true, msg: 'AWS Elastic Transcoder Implementation.'})
);

/** Creating a Server */
const server = app.listen(PORT, () => {
  console.log(
    '\nServer running at ' +
      `http://${application.HOST}:${PORT}/`.green.underline.bold +
      ` in ${application.APP_ENV} mode!`
  );
});

/** Handle Unhandled Exception */
process.on('unhandledRejection', (err, promises) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
