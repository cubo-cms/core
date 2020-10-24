/** @package        @cubo-cms/core
  * @version        0.2.13
  * @copyright      2020 Cubo CMS <https://cubo-cms.com/COPYRIGHT.md>
  * @license        MIT license <https://cubo-cms.com/LICENSE.md>
  * @author         Papiando <info@papiando.com>
  * @module         Log
  * @description    Log class - Allows logging messages
  **/

/** TODO:
  *   - The intention is to use this only for console or text file logging
  *   - Need to add methods to make this possible
  **/

// Define colors for different types of messages
const logColors = {
  debug: { color: "\x1b[35m" },   // Magenta
  error: { color: "\x1b[31m" },   // Red
  info: { color: "\x1b[36m" },    // Cyan
  reset: { color: "\x1b[0m" },    // Reset to normal
  success: { color: "\x1b[32m" }, // Green
  warning: { color: "\x1b[33m" }  // Yellow
};

/** @function normalize(data)
  *
  * Function normalize - makes sure there is an object with required fields
  *
  * @param {string||object} data
  * @param {string} type - error type
  * @return {object}
  **/
function normalize(data, type = 'debug') {
  let returnData = {};
  if(typeof data === 'string') {
    returnData.message = data;
    returnData.type = type;
  } else if(typeof data === 'object') {
    returnData.message = data.message || 'Unknown error';
    returnData.type = data.type || type;
  } else {
    returnData.message = 'Unknown error';
    returnData.type = type;
  }
  returnData.time = new Date().getTime();
  return returnData;
}
/** @function formatted(data)
  *
  * Function formatted - outputs the data formatted with fancy colors
  *
  * @param {string||object} data
  * @param {string} type - error type
  * @return {string}
  **/
function formatted(data, type = 'debug') {
  data = normalize(data, type);
  let output =
    (Log.default.useLocale ? new Date(data.time).toLocaleString(Log.default.locale) : new Date(data.time).toISOString()) + ' - ' +
    (Log.default.colorize ? logColors[data.type].color + data.type + logColors['reset'].color : data.type) + ': ' +
    data.message;
  return output;
}

/** @module Log
  *
  * Log class - Allows logging exceptions
  **/
export default class Log {
  /** @property {object} default - holds default values
    **/
  static default = {
    colorize: false,                            // Use colors in log
    useLocale: false,                           // Show date using locale
    locale: new Intl.Locale('nl-NL', { timezone: 'America/Curacao' }),
    suppress: ['info', 'debug'],                // Suppress message types
    restrict: []                                // Restrict classes that can log
  };
  /** @function constructor(data)
    *
    * Class constructor
    *
    * @param {object} exception - object holding error information
    **/
  constructor(data = 'Unknown error') {
    Log.error(data);
  }
  /** @function message(data)
    *
    * Function message - detect message type and log message to console
    *
    * @param {object} data
    **/
  message(data) {
    if(typeof data === 'string') {
      Log.error(data);
      return;
    }
    switch(data.type) {
      case 'debug':
        Log.debug(data);
        break;
      case 'error':
        Log.error(data);
        break;
      case 'info':
        Log.info(data);
        break;
      case 'success':
        Log.success(data);
        break;
      case 'warning':
        Log.debug(data);
        break;
      default:
        Log.debug(data);
    }
  }
  /** Static @function debug(data)
    *
    * Static function debug - write debug message to console
    *
    * @param {object} data
    **/
  static debug(data) {
    if(!this.default.suppress.includes('debug') && !this.default.restrict.includes(data.class))
      console.debug(formatted(data, 'debug'));
  }
  /** Static @function error(data)
    *
    * Static function error - write error message to console
    *
    * @param {object} data
    **/
  static error(data) {
    if(!this.default.suppress.includes('error') && !this.default.restrict.includes(data.class))
      console.debug(formatted(data, 'error'));
  }
  /** Static @function info(data)
    *
    * Static function info - write info message to console
    *
    * @param {object} data
    **/
  static info(data) {
    if(!this.default.suppress.includes('info') && !this.default.restrict.includes(data.class))
      console.info(formatted(data, 'info'));
  }
  /** Static @function success(data)
    *
    * Static function success - write success message to console
    *
    * @param {object} data
    **/
  static success(data) {
    if(!this.default.suppress.includes('success') && !this.default.restrict.includes(data.class))
      console.log(formatted(data, 'success'));
  }
  /** Static @function warning(data)
    *
    * Static function warning - write warning message to console
    *
    * @param {object} data
    **/
  static warning(data) {
    if(!this.default.suppress.includes('warning') && !this.default.restrict.includes(data.class))
      console.warn(formatted(data, 'warning'));
  }
}
