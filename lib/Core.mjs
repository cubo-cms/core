/** @package        @cubo-cms/core
  * @version        0.1.0
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
  /** Static @function basePath()
    *
    * Static getter function basePath - returns the path to the web root (removing node_modules)
    *
    * @return {string}
    **/
  static get basePath() {
    return Core.thisPath.substring(0, Core.thisPath.indexOf('/node_modules') == -1 ? Core.thisPath.lastIndexOf('/') : Core.thisPath.indexOf('/node_modules'));
  }
  /** Static @function thisPath()
    *
    * Static getter function thisPath - returns the path to this module
    *
    * @return {string}
    **/
  static get thisPath() {
    return path.dirname(fileURLToPath(import.meta.url));
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
    for(const item of Object.keys(data)) {
      if(item == '@data') {
        // Avoid @data properties being erased
        for(const [property, value] of Object.entries(data[item])) {
          this.set(property, value);
        }
      } else {
        this[item] = data[item];
      }
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
    * NOTE: change in the future to include other formats such as XML
    *
    * @param {string||object} data - either an object or a path to the object
    * @param {string||object} defaultData - loads default data if data undefined
    * @return {object}
    **/
  static load(data = {}, defaultData = null) {
    return Core.loadJSON(data, defaultData);
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
      let filePath = Core.resolve(data);
      if(filePath) {
        data = JSON.parse(Core.loadFile(filePath));
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
        return filePath.startsWith('#/') ? path.join(Core.basePath, filePath.substr(1)) : filePath;
      }
    } else
      return undefined;
  }
}
