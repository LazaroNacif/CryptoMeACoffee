const DEBUG = typeof process !== 'undefined' && process.env.NODE_ENV !== 'production';

export const logger = {
  log: (...args) => {
    if (DEBUG) {
      console.log(...args); // eslint-disable-line no-console
    }
  },
  error: (...args) => {
    console.error(...args); // eslint-disable-line no-console
  },
  warn: (...args) => {
    if (DEBUG) {
      console.warn(...args); // eslint-disable-line no-console
    }
  },
  info: (...args) => {
    if (DEBUG) {
      console.info(...args); // eslint-disable-line no-console
    }
  },
};
