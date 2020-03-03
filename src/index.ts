import app from './app';
import './database';

import config from './config/config';

app.listen(config.SERVER.PORT, () => {
    console.log(`Server on port ${config.SERVER.PORT}.`);
});