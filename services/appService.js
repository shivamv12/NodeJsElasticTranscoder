const Post = require('../models/Post');
const uploadFile = require('../utils/fileUploader');
const mediaNameGenerator = require('../helpers/mediaNameGenerator');

const submitPost = async (payload, media) => {
  let postData = new Post();
  postData.content = payload.content;
  postData.media = await mediaNameGenerator(media.name);
  postData = await postData.save();

  /** Upload original video */
  await uploadFile(postData.media, media.data, media.mimetype);

  /** Spin off redis job to upload different versions */
  // uploadVideoJob({
  //   data: media.data,
  //   filename: res.file_name,
  //   contentType: media.mimetype,
  // });

  return postData;
};

module.exports = {submitPost};
