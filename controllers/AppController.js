const appService = require('../services/appService');

/**
 * @param {*} req
 * @param {*} res
 * @returns {data, mesg}
 * @desc {} Method to handle incoming request to submit video
 */
const submitPost = async (req, res) => {
  try {
    const body = {...req.body};
    const media = req.files.media;

    let response = await appService.submitPost(body, media);
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
