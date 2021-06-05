require('dotenv').config({path: './configuration/.env'});

const transcoderConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION,
  videoBucket: process.env.AWS_BUCKET_NAME,
  transcode: {
    video: {
      pipelineId: process.env.AWS_PIPELINE_ID,
      outputKeyPrefix: process.env.AWS_OUTPUT_KEY_PREFIX,
      presets: [
        {presetId: '1351620000001-000020', suffix: '_480', prefix: 'large_'},
        {presetId: '1351620000001-000040', suffix: '_360', prefix: 'medium_'},
      ],
    },
  },
};

module.exports = transcoderConfig;
