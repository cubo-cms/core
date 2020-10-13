/** @package        @cubo-cms/core
  * @version        0.0.6
  * @copyright      2020 Cubo CMS <https://cubo-cms.com/COPYRIGHT.md>
  * @license        MIT license <https://cubo-cms.com/LICENSE.md>
  * @author         Papiando <info@papiando.com>
  * @module         Log
  * @description    Log class - Allows logging exceptions
  **/

/** TODO:
  *   - The intention is to use this only for console or text file logging
  *   - Need to add methods to make this possible
  **/

// Define colors for different types of messages
const logColors = {
  'debug': { 'color': "\x1b[35m" },   // Magenta
  'error': { 'color': "\x1b[31m" },  // Red
  'reset': { 'color': "\x1b[0m" },   // Reset to normal
  'success': { 'color': "\x1b[32m" }, // Green
  'warning': { 'color': "\x1b[33m" }  // Yellow
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
    new Date(data.time).toISOString() + ' - ' +
    logColors[data.type].color + data.type + logColors['reset'].color + ': ' +
    data.message;
  return output;
}

/** @module Log
  *
  * Log class - Allows logging exceptions
  **/
export default class Log {
  /** @function constructor(data)
    *
    * Class constructor
    *
    * @param {object} exception - object holding error information
    **/
  constructor(data = 'Unknown error') {
    if(typeof data === 'object') {
      switch(data.type || 'debug') {
        case 'information':
        case 'info':
        case 'success':
          Log.success(data);
          break;
        case 'error':
          Log.error(data);
          break;
        case 'warning':
        case 'warn':
          Log.warning(data);
          break;
        case 'debug':
        default:
          Log.debug(data);
      }
    } else {
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
    console.debug(formatted(data, 'debug'));
    console.trace();
  }
  /** Static @function error(data)
    *
    * Static function error - write error message to console
    *
    * @param {object} data
    **/
  static error(data) {
    console.debug(formatted(data, 'error'));
    console.trace();
  }
  /** Static @function success(data)
    *
    * Static function success - write success message to console
    *
    * @param {object} data
    **/
  static success(data) {
    console.log(formatted(data, 'success'));
  }
  /** Static @function warning(data)
    *
    * Static function warning - write warning message to console
    *
    * @param {object} data
    **/
  static warning(data) {
    console.warn(formatted(data, 'warning'));
  }
}
