const appService = require('../services/appService');

/**
 * @param {*} req, res
 * @returns {data, mesg}
 * @desc {} - Method to handle incoming request to submit video
 */
const submitPost = async (req, res) => {
  try {
    const {media} = req.files;
    const {content} = req.body;

    const response = await appService.submitPost(content, media);
    if (!response)
      return res.status(422).json({
        success: false,
        data: null,
        mesg: 'Could not submit the post!',
      });

    return res.status(200).json({
      success: true,
      data: response,
      mesg: 'Post Successfully Submitted.',
    });
  } catch (err) {
    return res.status(500).json({mesg: err.message});
  }
};

module.exports = {submitPost};
