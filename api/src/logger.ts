import { createLogger, format, transports } from 'winston';

const myFormat = format(info => {
  console.log(`${info.level} : ${info.message}`);
  return info;
});

const logger = createLogger({
  level: 'info',
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        myFormat(),
        format.prettyPrint()
      )
    })
  ]
});

export default logger;
