/**
 * @param {*} media_name
 * @returns String (filename)
 */
const mediaNameGenerator = (media_name) => {
  let ext = media_name.split('.')[media_name.split('.').length - 1];
  let prefix = 'nodejs_elastic_transcoder_';
  return prefix + parseInt(Math.random() * 987654321) + '.' + ext;
};

module.exports = mediaNameGenerator;
