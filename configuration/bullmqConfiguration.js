const {Queue} = require('bullmq');
const IOredis = require('ioredis');
const worker = require('../jobs/handlers/workerHandler');

/** Redis Connection */
const connection = new IOredis(process.env.REDIS_PORT || 6379);

const bullmq = async () => {
  const queue = new Queue('default', {connection});

  /** Calling worker */
  worker();

  return queue;
};

module.exports = bullmq;
