const AWS = require('aws-sdk');
const transcoderConfig = require('../../configuration/transcoderConfiguration');

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
  const {filename} = payload;

  const transcoder = new AWS.ElasticTranscoder();
  let ext = filename.split('.').reverse().shift();
  let withoutExt = filename.split('.').reverse().pop();
  let file_name = withoutExt + '.' + ext;

  /** Transcoder Service */
  let params = {
    PipelineId: transcoderConfig.transcode.video.pipelineId,
    Input: {
      Key: transcoderConfig.transcode.video.outputKeyPrefix + '/' + file_name,
      FrameRate: 'auto',
      Resolution: 'auto',
      AspectRatio: 'auto',
      Interlaced: 'auto',
      Container: 'auto',
    },
    OutputKeyPrefix: transcoderConfig.transcode.video.outputKeyPrefix + '/',
    Outputs: transcoderConfig.transcode.video.presets.map((p) => {
      return {
        PresetId: p.presetId,
        Key: `${p.prefix}${file_name}`,
        ThumbnailPattern: `thumb-${p.prefix}${withoutExt}-{count}`,
      };
    }),
  };

  transcoder.createJob(params, (err, data) => {
    if (!!err) {
      console.warn(err);
      return;
    }
    let jobId = data.Job.Id;
    console.info('AWS transcoder job created (' + jobId + ')');

    transcoder.waitFor('jobComplete', {Id: jobId}, (err, data) => {
      if (!!err) console.log('Failed to wait for job complete: ', err);
      else {
        console.log('AWS transcoder job completed (' + jobId + ')');
        console.log('\nNeed to update media_statue & thumbnail.');
      }
    });
  });
};

module.exports = uploadVideoResolver;
