const express = require('express');
const apiRouter = express.Router();

/** Endpoints */
apiRouter.get('/', (req, res) =>
  res.json({success: true, msg: 'AWS Elastic Transcoder Implementation.'})
);

module.exports = apiRouter;
