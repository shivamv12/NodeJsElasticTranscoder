const express = require('express');
const apiRouter = express.Router();
const {submitPost} = require('../controllers/AppController');
const {validatePost} = require('../middlewares/validators/postValidator');
const mediaValidator = require('../middlewares/validators/mediaValidator');

/** Endpoints */
apiRouter
  .route('/')
  .get((req, res) =>
    res.json({success: true, msg: 'AWS Elastic Transcoder Implementation.'})
  );

apiRouter.route('/post').post(validatePost, mediaValidator(), submitPost);

module.exports = apiRouter;
