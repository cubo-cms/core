/** @package        @cubo-cms/core
  * @version        0.0.3
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
  constructor(exception) {
    switch(exception.type || 'debug') {
      case 'information':
      case 'info':
      case 'success':
        console.info('Success: ' + exception.message);
        break;
      case 'debug':
        console.debug('Debug: ' + exception.message);
        console.trace();
        break;
      case 'warning':
      case 'warn':
        console.warn('Warning: ' + exception.message);
        break;
      case 'error':
      default:
        console.error('Error: ' + exception.message);
        console.trace();
    }
  }
}
