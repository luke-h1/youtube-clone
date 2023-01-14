import dayjs from 'dayjs';
import pino from 'pino';

const logger = pino({
  base: {
    pid: false,
  },
  timestamp: () => `, "time":"${dayjs().format()}"`,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});
export default logger;
