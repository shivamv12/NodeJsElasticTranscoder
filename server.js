const app = require('./app');
const {application} = require('./configuration/appConfiguration');
const dbConnect = require('./configuration/databaseConfiguration');

/** Initialize Database Connection */
dbConnect();

/** Assinging the PORT */
const PORT = application.port || 5000;

/** Creating a Server */
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
