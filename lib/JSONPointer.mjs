/** @package        @cubo-cms/core
  * @version        0.2.14
  * @copyright      2020 Cubo CMS <https://cubo-cms.com/COPYRIGHT.md>
  * @license        MIT license <https://cubo-cms.com/LICENSE.md>
  * @author         Papiando <info@papiando.com>
  * @module         JSONPointer
  * @description    JSONPointer class - Helper class to use JSON-Pointer objects [RFC6901]
  **/

/** @module JSONPointer
  *
  * JSONPointer class - Helper class to use JSON-Pointer objects [RFC6901]
  *   NOTE: Does not fully comply with RFC as it is not needed for this framework
  **/
export default class JSONPointer {
  /** Private @property {object} data - private class data
    **/
  #data;
  /** @function constructor(data)
    *
    * Class constructor
    *
    * @param {object} data - passed object data; defaults to empty object
    **/
  constructor(data = {}) {
    this.#data = data;
  }
  /** @function get(pointer,defaultValue)
    *
    * Function get - returns the value indicated by pointer
    *
    * @param {string} pointer
    * @param {any} defaultValue - returns default value if value undefined
    * @return {any}
    **/
  get(pointer, defaultValue = undefined) {
    return JSONPointer.get(this.#data, pointer, defaultValue);
  }
  /** Static @function get(object,pointer,defaultValue)
    *
    * Static function get - returns the value indicated by pointer
    *
    * @param {object} object
    * @param {string} pointer
    * @param {any} defaultValue - returns default value if value undefined
    * @return {any}
    **/
  static get(object, pointer, defaultValue = undefined) {
    if(typeof object !== 'object') return defaultValue;
    if(typeof pointer === 'string') {
      pointer = pointer.split('/');
      if(pointer[0] !== '') return defaultValue;
      pointer = pointer.slice(1);
      pointer.forEach((property) => {
        if(object[property] === undefined) {
          return object = defaultValue;
        } else {
          object = object[property];
        }
      });
      return object;
    } else {
      return defaultValue;
    }
  }
}
