/** @package        @cubo-cms/core
  * @version        0.0.9
  * @copyright      2020 Cubo CMS <https://cubo-cms.com/COPYRIGHT.md>
  * @license        MIT license <https://cubo-cms.com/LICENSE.md>
  * @author         Papiando <info@papiando.com>
  * @module         Exception
  * @description    Exception class - Allows proper and clean handling of exceptions
  **/

/** TODO:
  *   - The intention is to use this to provide feedback to the visitor
  *   - Need to add methods to make this possible
  **/

/** @module Exception
  *
  * Exception class - Allows proper and clean handling of exceptions
  **/
export default class Exception {
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
        console.info('Info: ' + exception.message);
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
