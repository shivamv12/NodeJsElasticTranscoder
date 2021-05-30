const mongoose = require('mongoose');
const {database} = require('./appConfigurer');

const dbConnect = async () => {
  const mongoConfig = {
    autoIndex: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };

  const connUrl = `mongodb+srv://${database.user}:${database.password}@${database.cluster}/${database.name}?retryWrites=true&w=majority`;
  const conn = await mongoose.connect(connUrl, mongoConfig);

  console.log(
    `Database Connected: ` +
      `Ready State ${conn.connection.readyState}\n`.yellow
  );
};

module.exports = dbConnect;
