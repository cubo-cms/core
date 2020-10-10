/** @package        @cubo-cms/core
  * @version        0.0.3
  * @copyright      2020 Cubo CMS <https://cubo-cms.com/COPYRIGHT.md>
  * @license        MIT license <https://cubo-cms.com/LICENSE.md>
  * @author         Papiando <info@papiando.com>
  * @module         Core
  * @description    Core class - Almost all classes extend this core class
  **/

/** TODO:
  **/

import fs from 'fs';
import path from 'path';

/** @module Core
  *
  * Core class - Almost all classes extend this core class
  *   NOTE: First register all modules
  **/
export default class Core {
  /** Private @property {object} caller - to determine which object created this one
    **/
  #caller;
  /** Private @property {object} name - remembers class name
    **/
  #name;
  /** @function constructor(data)
    *
    * Class constructor
    *
    * @param {string||object} data - passed object data; defaults to empty object
    **/
  constructor(data = {}) {
    this.#name = this.__proto__.constructor.name;
    this['@data'] = {};
    this.load(data);
  }
  /** @function caller()
    *
    * Getter function caller - returns the object that created this one
    *
    * @return {object}
    **/
  get caller() {
    return this.#caller;
  }
  /** @function class()
    *
    * Getter function class - returns the name of this class
    *
    * @return {string}
    **/
  get class() {
    return this.#name;
  }
  /** @function _id()
    *
    * Getter function id - returns the id property
    *
    * @return {int||string}
    **/
  get _id() {
    return this.get('_id');
  }
  /** @function _name()
    *
    * Getter function id - returns the name property
    *
    * @return {string}
    **/
  get _name() {
    return this.get('_name');
  }
  /** @function _type()
    *
    * Getter function type - returns the object type
    *
    * @return {string}
    **/
  get _type() {
    return this.get('_type');
  }
  /** @function caller(caller)
    *
    * Setter function caller - stores the object that created this object
    *
    * @param {object} caller
    **/
  set caller(caller) {
    this.#caller = caller;
  }
  /** @function _(property,defaultValue)
    *
    * Short-hand alias for function get - returns value of a property from @data
    *
    * @param {string} property
    * @param {any} defaultValue - returns default value if value undefined
    * @return {any}
    **/
  _(property, defaultValue = undefined) {
    return this.get(property, defaultValue);
  }
  /** @function get(property,defaultValue)
    *
    * Function get - returns value of a property from @data
    *
    * @param {string} property
    * @param {any} defaultValue - returns default value if value undefined
    * @return {any}
    **/
  get(property, defaultValue = undefined) {
    let regex = /^\{(.+?)\}$/;
    let value = this['@data'][property] || defaultValue;
    return regex.test(value) ? this['@data'][value] || value : value;
  }
  /** @function load(data,defaultData)
    *
    * Function load - loads object and merges data
    *
    * @param {string||object} data - either an object or a path to the object
    * @param {string||object} defaultData - loads default data if data undefined
    * @return {object}
    **/
  load(data = {}, defaultData = {}) {
    data = Core.load(data, defaultData);
    this.merge(data || defaultData);
    return this;
  }
  /** @function merge(data)
    *
    * Function merge - merges data from a loaded object
    *
    * @param {string||object} data - either an object or a path to the object
    * @return {object}
    **/
  merge(data) {
    // Copy one by one to avoid referenced object
    for(const [property, value] of Object.entries(data)) {
      this[property] = data[property];
    }
    return this;
  }
  /** @function reset(property)
    *
    * Function reset - removes a property from @data
    *
    * @param {string} property
    **/
  reset(property) {
    delete this['@data'][property];
    return undefined;
  }
  /** @function set(property,value,defaultValue)
    *
    * Function set - stores a value in a property at @data
    *
    * @param {string} property
    * @param {any} value
    * @param {any} defaultValue - returns default value if value undefined
    **/
  set(property, value, defaultValue) {
    this['@data'][property] = value || defaultValue;
  }
  /** Static @function load(data,defaultData)
    *
    * Static function load - loads data from a path and returns object
    *
    * @param {string||object} data - either an object or a path to the object
    * @param {string||object} defaultData - loads default data if data undefined
    * @return {object}
    **/
  static load(data = {}, defaultData = null) {
    let id;
    if(id = Core.resolve(data)) {
      if(data.includes('//')) {
        // TODO: read from stream
        return null;
      } else {
        try {
          // TODO: in ES6 scripts need to be imported; extension is .mjs
          if(fs.existsSync(id) || fs.existsSync(id + '.js') || fs.existsSync(id + '.json')) {
            // TODO: might no longer work in ES6
            data = require(id);
          } else {
            // Soft fail - file does not exist
            data = null;
          }
        } catch(error) {
          // Soft fail - could not read
          data = null;
        }
      }
    } else if(typeof(data) != 'object') {
      // Soft fail
      data = null;
    }
    return data || defaultData;
  }
  /** Static @function loadFile(fileName)
    *
    * Static function loadFile - loads a file
    *
    * @param {string} fileName - an absolute or relative file path and returns object
    * @return {object} - returns null if file could not be loaded
    **/
  static loadFile(fileName = null) {
    let filePath = Core.resolve(fileName);
    if(filePath) {
      if(filePath.includes('//')) {
        // TODO: read from stream
        return null;
      } else {
        try {
          return fs.readFileSync(filePath);
        } catch(error) {
          // Soft fail - could not read
          return null;
        }
      }
    } else {
      // Soft fail
      return null;
    }
  }
  /** Static @function resolve(thisPath)
    *
    * Static function resolve - reconstructs path
    * TODO: might no longer work
    *
    * @param {string} thisPath - absolute or relative path; '#' resolves to web root
    * @return {string}
    **/
  static resolve(thisPath = '.') {
    if(typeof(thisPath) == 'string') {
      if(thisPath.includes('//')) {
        return thisPath;
      } else {
        return path.isAbsolute(thisPath) ? thisPath : thisPath.startsWith('#/') ? path.join(__base, thisPath.substr(1)) : path.resolve(__dirname, thisPath);
      }
    } else
      return null;
  }
}
