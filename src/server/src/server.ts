import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';

export default function createServer(): Express {
  const app = express();

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
  );

  // middleware
  app.disable('x-powered-by');
  app.use(cookieParser());
  app.use(express.json());
  app.use(compression());
  app.use(helmet());

  // routes
  // ...

  return app;
}
