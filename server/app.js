
import express from 'express';

import bootExpress from './boot/express';

const app = express();
bootExpress(app, __dirname);

export default app;