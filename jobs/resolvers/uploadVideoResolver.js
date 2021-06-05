const AWS = require('aws-sdk');
const Post = require('../../models/Post');
const transcoderConfig = require('../../configuration/transcoderConfiguration');

/** AWS configuration details */
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

AWS.config.update({
  region: transcoderConfig.region,
  accessKeyId: transcoderConfig.accessKeyId,
  secretAccessKey: transcoderConfig.secretAccessKey,
});

/**
 * @param {*} payload
 * @desc {} - Resolving the job of uploading multiple versions of uploaded video.
 */
const uploadVideoResolver = async (payload) => {
  const {media, slug, filename} = payload;

  const transcoder = new AWS.ElasticTranscoder();
  let ext = filename.split('.').reverse().shift();
  let withoutExt = filename.split('.').reverse().pop();
  let file_name = `${withoutExt}.${ext}`;

  s3.putObject(
    {
      ContentType: media.mimetype,
      Body: Buffer.from(media.data.data),
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${process.env.AWS_OUTPUT_KEY_PREFIX}/${filename}`,
    },
    (error, res) => {
      if (!!error) console.error(`Failed to upload media file: ${error}`);

      console.log(`${JSON.stringify(res)} successfully uploaded.`);

      /** Transcoder Service */
      let params = {
        PipelineId: transcoderConfig.transcode.video.pipelineId,
        Input: {
          FrameRate: 'auto',
          Container: 'auto',
          Interlaced: 'auto',
          Resolution: 'auto',
          AspectRatio: 'auto',
          Key: `${transcoderConfig.transcode.video.outputKeyPrefix}/${file_name}`,
        },
        OutputKeyPrefix: `${transcoderConfig.transcode.video.outputKeyPrefix}/`,
        Outputs: transcoderConfig.transcode.video.presets.map((p) => {
          return {
            PresetId: p.presetId,
            Key: `${p.prefix}${file_name}`,
            ThumbnailPattern: `thumb-${p.prefix}${withoutExt}-{count}`,
          };
        }),
      };

      transcoder.createJob(params, (error, data) => {
        if (!!error) console.error(`Failed to create job: ${error}`);
        const jobId = data.Job.Id;
        console.info(`AWS transcoder job created (${jobId})`);

        transcoder.waitFor('jobComplete', {Id: jobId}, async (error, data) => {
          if (!!error)
            console.error(`Failed to wait for job complete: ${error}`);

          console.log(`AWS transcoder job completed (${jobId})`);
          await Post.findOneAndUpdate(
            {slug: slug},
            {
              $set: {
                media_status: 'completed',
                thumbnail: `thumb-large-${withoutExt}-00001.png`,
              },
            }
          );
        });
      });
    }
  );
};

module.exports = uploadVideoResolver;
