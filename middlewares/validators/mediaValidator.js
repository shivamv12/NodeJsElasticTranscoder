/**
 * @desc {} - Validates the input media file for certain parameters
 */
const mediaValidator = () => {
  return function (req, res, next) {
    try {
      let resObj = {};
      const {media} = req.files;

      if (!media) resObj = {mesg: 'Please upload media file.'};
      else if (!media.mimetype.includes('video'))
        resObj = {mesg: 'Please upload video only.'};
      else if (Math.floor(media.size / 1000000) > 5)
        resObj = {mesg: 'Please upload video maximum size of 5 MB.'};

      if (Object.keys(resObj).length)
        return res.status(422).json({success: false, ...resObj});

      next();
    } catch (e) {
      return res.status(415).json({msg: `Error: ${e.message}`});
    }
  };
};

module.exports = mediaValidator;
