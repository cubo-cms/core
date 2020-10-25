/** @package        @cubo-cms/core
  * @version        0.2.14
  * @copyright      2020 Cubo CMS <https://cubo-cms.com/COPYRIGHT.md>
  * @license        MIT license <https://cubo-cms.com/LICENSE.md>
  * @author         Papiando <info@papiando.com>
  * @module         Core
  * @description    Core class - Almost all classes extend this core class
  **/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/** @module Core
  *
  * Core class - Almost all classes extend this core class
  *   NOTE: First register all modules
  **/
export default class Core {
  /** Private @property {object} caller - to determine which object created this one
    **/
  #caller;
  /** Private @property {object} data - private class data
    **/
  #data;
  /** Private @property {object} name - remembers class name
    **/
  #name;
  /** @property {object} status - basic status codes and messages
    **/
  status = {
    ok: { code: 200, message: 'OK' },
    created: { code: 201, message: 'Created' },
    accepted: { code: 202, message: 'Accepted' },
    modified: { code: 204, message: 'Modified' },
    found: { code: 302, message: 'Found' },
    notModified: { code: 304, message: 'Not Modified' },
    redirect: { code: 307, message: 'Redirected' },
    badRequest: { code: 400, message: 'Bad Request' },
    unauthorized: { code: 401, message: 'Unauthorized' },
    forbidden: { code: 403, message: 'Forbidden' },
    notFound: { code: 404, message: 'Not Found' },
    notAllowed: { code: 405, message: 'Not Allowed' },
    notAcceptable: { code 406: message: 'Not Acceptable' },
    serverError: { code: 500, message: 'Server Error' }
  };
  /** @function constructor(data)
    *
    * Class constructor
    *
    * @param {string||object} data - passed object data; defaults to empty object
    **/
  constructor(data = {}) {
    this.#name = this.__proto__.constructor.name;
    this.#data = {};
    this.load(data);
  }
  /** Static @function basePath()
    *
    * Static getter function basePath - returns the path to the web root (removing node_modules)
    *
    * @return {string}
    **/
  static get basePath() {
    return this.path.substring(0, this.path.indexOf(path.sep + 'node_modules') == -1 ? this.path.lastIndexOf(path.sep) : this.path.indexOf(path.sep + 'node_modules'));
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
  /** @function data()
    *
    * Getter function data - returns class data
    *
    * @return {string}
    **/
  get data() {
    return this.#data;
  }
  /** @function map()
    *
    * Getter function map - converts class data to a map
    *
    * @return {Map}
    **/
  get map() {
    return new Map(Object.entries(this.#data));
  }
  /** @function name()
    *
    * Getter function name - returns the name of this class
    *
    * @return {string}
    **/
  get name() {
    return this.#name;
  }
  /** Static @function path()
    *
    * Static getter function path - returns the path to this module
    *
    * @return {string}
    **/
  static get path() {
    return path.dirname(fileURLToPath(import.meta.url));
  }
  /** @function properties()
    *
    * Getter function properties - returns class data
    *
    * @return {string}
    **/
  get properties() {
    return this.#data;
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
    * Function get - returns value of a property from #data
    *
    * @param {string} property
    * @param {any} defaultValue - returns default value if value undefined
    * @return {any}
    **/
  get(property, defaultValue = undefined) {
    if(typeof property === 'string') {
      return this.#data[property] || defaultValue;
    } else {
      return defaultValue;
    }
  }
  /** @function has(property)
    *
    * Function has - returns true if property exists
    *
    * @param {string} property
    * @return {bool}
    **/
  has(property) {
    if(typeof property === 'string') {
      return this.#data[property] !== undefined;
    } else {
      return false;
    }
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
    return this.merge(data || defaultData);
  }
  /** @function merge(data)
    *
    * Function merge - merges data from a loaded object
    *
    * @param {string||object} data - either an object or a path to the object
    * @return {object}
    **/
  merge(data) {
    if(typeof data === 'object')
      if(data instanceof Map) {
        for(const [property, value] of data) {
          this.set(property, value);
        }
      } else {
        for(const [property, value] of Object.entries(data)) {
          this.set(property, value);
        }
      }
    return this;
  }
  /** @function reset(property)
    *
    * Function reset - removes a property from #data
    *
    * @param {string} property
    **/
  reset(property) {
    delete this.#data[property];
    return undefined;
  }
  /** @function set(property,value,defaultValue)
    *
    * Function set - stores a value in a property at #data
    *
    * @param {string} property
    * @param {any} value
    * @param {any} defaultValue - returns default value if value undefined
    **/
  set(property, value, defaultValue) {
    return this.#data[property] = value || defaultValue;
  }
  /** @function toJSON()
    *
    * Function toJSON - returns JSON representation of data
    *
    * @return {object}
    **/
  toJSON() {
    return this.data;
  }
  /** @function toString()
    *
    * Function toString - returns name of class
    *
    * @return {string}
    **/
  toString() {
    return this.name;
  }
  /** Static @function load(data,defaultData)
    *
    * Static function load - loads data from a path and returns object
    * NOTE: change in the future to include other formats such as XML
    *
    * @param {string||object} data - either an object or a path to the object
    * @param {string||object} defaultData - loads default data if data undefined
    * @return {object}
    **/
  static load(data = {}, defaultData = null) {
    if(typeof data === 'string') {
      switch(path.extname(data)) {
        case '.json':
          return this.loadJSON(data, defaultData);
          break;
        default:
          return this.loadFile(data, defaultData);
      }
    } else {
      return this.loadJSON(data, defaultData);
    }
  }
  /** Static @function loadFile(data)
    *
    * Static function loadFile - loads data from a path and returns content
    *
    * @param {string} data - either an object or a path to the object
    * @return {string}
    **/
  static loadFile(data = null) {
    let filePath = Core.resolve(data);
    if(filePath) {
      if(data.includes('//')) {
        // TODO: read from stream
        return null;
      } else {
        try {
          if(fs.existsSync(filePath)) {
            data = fs.readFileSync(filePath, 'utf8');
          } else {
            Log.error(`File \"${filePath}\" not found`);
            data = null;
          }
        } catch(error) {
          Log.error(`File system error`);
          data = null;
        }
      }
    } else {
      Log.error(`Incorrect file path`);
      data = null;
    }
    return data;
  }
  /** Static @function loadJSON(data,defaultData)
    *
    * Static function loadJSON - loads data from a path and returns object
    *
    * @param {string||object} data - either an object or a path to the object
    * @param {string||object} defaultData - loads default data if data undefined
    * @return {object}
    **/
  static loadJSON(data = {}, defaultData = null) {
    if(typeof data === 'string') {
      let filePath = this.resolve(data);
      if(filePath) {
        data = JSON.parse(this.loadFile(filePath));
      } else {
        Log.error(`Incorrect file path`);
        data = null;
      }
    }
    return data || defaultData;
  }
  /** Static @function resolve(filePath)
    *
    * Static function resolve - reconstructs path
    * TODO: might no longer work
    *
    * @param {string} filePath - absolute or relative path; '#' resolves to web root
    * @return {string}
    **/
  static resolve(filePath = '.') {
    if(typeof(filePath) == 'string') {
      if(filePath.includes('//')) {
        return filePath;
      } else {
        // TODO: __base is no longer used
        return filePath.startsWith('#/') ? path.join(this.basePath, filePath.substr(1)) : filePath;
      }
    } else
      return undefined;
  }
}
