const bullmq = require('../configuration/bullmqConfiguration');

/**
 * @param {*} payload
 * @desc {} - Job to upload different versions of uploaded video.
 */
const uploadVideoJob = async (payload) => {
  const queue = await bullmq();
  queue.setMaxListeners(queue.getMaxListeners() + 1);

  queue.add('uploadVideo', payload, {
    attempts: 3,
    lifo: false,
    removeOnComplete: true,
    backoff: {type: 'exponential', delay: 1000},
  });
};

module.exports = uploadVideoJob;
