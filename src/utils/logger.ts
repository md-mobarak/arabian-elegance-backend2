// // src/utils/logger.ts
// import { createLogger, format, transports } from 'winston';

// // Create a logger instance
// const logger = createLogger({
//   level: 'info',
//   format: format.combine(
//     format.timestamp(),
//     format.json(),
//   ),
//   transports: [
//     new transports.Console(), // Log to console
//     new transports.File({ filename: 'error.log', level: 'error' }), // Log errors to a file
//     new transports.File({ filename: 'combined.log' }), // Log all combined logs
//   ],
// });

// // Export the logger
// export default logger;
