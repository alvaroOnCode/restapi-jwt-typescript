import mongoose, { ConnectionOptions } from 'mongoose';

import config from './config/config';

const connection = mongoose.connection;

connection.once('open', () => console.log('DB is ready!'));
connection.on('error', error => {
    console.error(error);
    process.exit(0);
});

const dbOptions: ConnectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(config.DB.URI, dbOptions);