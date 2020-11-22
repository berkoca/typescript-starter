import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import express from 'express';
import router from './routes';
import { syncDB } from './utils';
import { urlencoded, json } from 'body-parser';

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(urlencoded({ extended: false }));
app.use(json());
app.use('/api', router);

syncDB(true);

app.listen(port, () => console.log(`App listening on port ${port}.`));