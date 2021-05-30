const {check, validationResult} = require('express-validator');

exports.validatePost = [
  check('content')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Please enter the content.')
    .bail()
    .isLength({min: 120})
    .withMessage('Content must be minimum 120 characters long.')
    .bail()
    .isLength({max: 1500})
    .withMessage('Content must be maximum 1500 characters long.')
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({success: false, errors: errors.array()});
    next();
  },
];
