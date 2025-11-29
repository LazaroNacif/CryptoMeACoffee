/**
 * Winston Logger Configuration
 * Structured logging for production environments
 */

import winston from 'winston';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure logs directory exists
const logsDir = join(__dirname, 'logs');
if (!existsSync(logsDir)) {
  mkdirSync(logsDir, { recursive: true });
}

// Custom log levels
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

// Log format with timestamps and colors
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Console format for development
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.printf(({ level, message, timestamp, ...meta }) => {
    let msg = `${timestamp} [${level}] ${message}`;
    if (Object.keys(meta).length > 0 && meta.timestamp === undefined) {
      msg += ` ${JSON.stringify(meta)}`;
    }
    return msg;
  })
);

// Create transports array
const transports = [];

// Always add file transports
transports.push(
  new winston.transports.File({
    filename: join(logsDir, 'error.log'),
    level: 'error',
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  }),
  new winston.transports.File({
    filename: join(logsDir, 'combined.log'),
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  })
);

// Add console transport in development or if not in production
if (process.env.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console({
      format: consoleFormat,
    })
  );
} else {
  // In production, use JSON format for console (for log aggregation services)
  transports.push(
    new winston.transports.Console({
      format: logFormat,
    })
  );
}

// Create the logger
export const logger = winston.createLogger({
  levels: logLevels,
  format: logFormat,
  defaultMeta: { service: 'cryptomeacoffee' },
  transports,
  exitOnError: false,
});

// Add helper methods for common logging patterns
logger.donation = (amount, message, metadata = {}) => {
  logger.info('Donation received', {
    amount,
    hasMessage: !!message,
    messageLength: message?.length || 0,
    ...metadata,
  });
};

logger.payment = (status, details = {}) => {
  logger.info('Payment event', {
    status,
    ...details,
  });
};

logger.security = (event, details = {}) => {
  logger.warn('Security event', {
    event,
    ...details,
  });
};

// Log initial message
logger.info('Logger initialized', {
  environment: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'info',
  logsDirectory: logsDir,
});

export default logger;
