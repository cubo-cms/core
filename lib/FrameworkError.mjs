/** @package        @cubo-cms/core
  * @version        0.2.14
  * @copyright      2020 Cubo CMS <https://cubo-cms.com/COPYRIGHT.md>
  * @license        MIT license <https://cubo-cms.com/LICENSE.md>
  * @author         Papiando <info@papiando.com>
  * @module         FrameworkError
  * @description    FrameworkError class - Allows throwing framework-specific errors
  **/

/** @module FrameworkError
  *
  * Framework class - Allows throwing framework-specific errors
  **/
export default class FrameworkError extends Error {
  /** @function constructor(error)
    *
    * Class constructor
    *
    * @param {string||object} error - error message and type of error
    **/
  constructor(error) {
    if(typeof error == 'string') {
      super(error);
      // Default to debug message if type is not given
      error = { message: error, type: 'debug' };
    } else {
      super(error.message || 'Unknown error');
    }
    // Store the error class
    error.class = this.constructor.name;
  }
}
