import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import deserializeUser from './middleware/deserializeUser';
import authRoutes from './modules/auth/auth.route';
import healthRoutes from './modules/health/health.route';
import userRoutes from './modules/user/user.route';
import videoRoutes from './modules/videos/video.route';

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
  app.use(deserializeUser);

  // routes
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/videos', videoRoutes);
  app.use('/api/v1/health', healthRoutes);

  return app;
}
