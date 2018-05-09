'use strict';

const moment = require('moment');
const winston = require('winston');
const debug = require('debug');
const os = require('os');

module.exports = function () {
  winston.loggers.add('API', {
    console: {
      level: 'debug',
      colorize: true,
      timestamp() {
        return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
      },
      formatter(options) {
        return `${options.timestamp()} [front-api] [${os.hostname()}] ${
        options.level.toUpperCase()} : ${options.message ? options.message : ''
        }${options.meta && Object.keys(options.meta).length ? `\t${
        JSON.stringify(options.meta)}` : ''}`;
      }
    }
  });

  const customLogger = winston.loggers.get('API');

  debug.log = customLogger.debug.bind(customLogger);
  debug.error = customLogger.error.bind(customLogger);
  return debug;
};
