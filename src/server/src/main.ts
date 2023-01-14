import 'dotenv/config';
import createServer from './server';
import logger from './utils/logger';

const main = () => {
  const app = createServer();

  app.listen(4000, async () => {
    logger.info('Server started on http://localhost:4000');
  });

  // graceful shutdown
  ['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(signal => {
    process.on(signal, () => {
      logger.info(`\n server received ${signal} signal, shutting down...`);
      process.exit(0);
    });
  });
};

main();
