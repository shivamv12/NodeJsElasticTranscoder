const AWS = require('aws-sdk');

/** AWS configuration details */
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const uploadFile = async (fullPath, fileData, contentType) => {
  await s3.putObject(
    {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: process.env.AWS_OUTPUT_KEY_PREFIX + '/' + fullPath,
      Body: fileData,
      ContentType: contentType,
    },
    (err, res) => console.log(JSON.stringify(res) + ' successfully uploaded.')
  );
};

module.exports = uploadFile;
