const {Worker} = require('bullmq');
const uploadVideoResolver = require('../resolvers/uploadVideoResolver');

/**
 * @desc {} - Worker to handle jobs & call their respective resolvers
 */
const worker = async () => {
  const workerHandler = new Worker('default', async (job) => {
    switch (job.name) {
      case 'uploadVideo':
        uploadVideoResolver(job.data);
        break;
    }
  });

  workerHandler.on('completed', (job) => {
    console.log(`========================================================`);
    console.log(`Worker Mesg: ${job.name} has completed.`);
    console.log(`========================================================`);
  });
  workerHandler.on('failed', (job, err) => {
    console.log(`========================================================`);
    console.log(`Worker Mesg: ${job.name} has failed with ${err.message}!`);
    console.log(`========================================================`);
  });

  return workerHandler;
};

module.exports = worker;
