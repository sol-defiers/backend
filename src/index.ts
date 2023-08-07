import cors from 'cors';
import express, { Response, Request, Express } from 'express';
import logger from './middleware/logger';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import morgan from 'morgan';
import morganBody from 'morgan-body';
import helmet from 'helmet';

export const main = async () => {
  config();

  const PORT = process.env.PORT || 8000;
  const basePath = '/api/v1';

  const app: Express = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  // app.use(bodyParser.json());
  app.use(morgan('combined'));
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  morganBody(app, {
    noColors: true,
    logResponseBody: false,
  });

  app.get('/', (_req: Request, res: Response) => {
    res.send('Server is running');
  });

  app.listen(PORT, () => {
    logger.log('info', `Server is running on Port:${PORT}`);
  });
};
main()
  .then(() => {
    logger.info('App started');
  })
  .catch((err) => {
    logger.error('App failed');
    logger.error(err.stack);
  });
