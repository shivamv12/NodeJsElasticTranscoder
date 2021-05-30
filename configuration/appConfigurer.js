/**
 * @desc {} - App Environment Configuration
 */
let appConfig = {
  application: {
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost',
  },
};

switch (process.env.APP_ENV) {
  case 'production':
    appConfig = {
      database: {
        name: process.env.PROD_DB_NAME,
        user: process.env.PROD_DB_USER,
        cluster: process.env.PROD_DB_CLUSTER,
        password: process.env.PROD_DB_PASSWORD,
      },
      application: {
        ...appConfig.application,
        env: process.env.APP_ENV || 'production',
      },
    };
    break;

  case 'development':
    appConfig = {
      database: {
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        cluster: process.env.DB_CLUSTER,
        password: process.env.DB_PASSWORD,
      },
      application: {
        ...appConfig.application,
        env: process.env.APP_ENV || 'development',
      },
    };
    break;
}

module.exports = appConfig;
