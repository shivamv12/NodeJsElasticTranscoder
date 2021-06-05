const Post = require('../models/Post');
const uploadVideoJob = require('../jobs/uploadVideoJob');
const slugGenerator = require('../helpers/slugGenerator');
const mediaNameGenerator = require('../helpers/mediaNameGenerator');

const submitPost = async (content, media) => {
  let postData = new Post();
  postData.content = content;
  postData.media = await mediaNameGenerator(media.name);
  postData.slug = await slugGenerator(content.slice(0, 15), {length: 6});
  postData = await postData.save();

  /** Upload original video */
  // await uploadFile(postData.media, media.data, media.mimetype);

  /** Spinning off redis job to upload video & their different formats */
  uploadVideoJob({media, slug: postData.slug, filename: postData.media});

  return postData;
};

module.exports = {submitPost};
