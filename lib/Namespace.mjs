/** @package        @cubo-cms/core
  * @version        0.1.12
  * @copyright      2020 Cubo CMS <https://cubo-cms.com/COPYRIGHT.md>
  * @license        MIT license <https://cubo-cms.com/LICENSE.md>
  * @author         Papiando <info@papiando.com>
  * @module         Namespace
  * @description    Static namespace class - Enables registering and loading modules
  *                 into a common namespace
  **/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import Log from './Log.mjs';

/** @module Namespace
  *
  * Static namespace class - Enables registering and loading modules
  * into a common namespace
  *   NOTE: Modules first need to be registered before loading
  *   NOTE: This class can publish loaded modules globally, if desired
  **/
export default class Namespace {
  /** @property {object} default - holds default values
    **/
  static default = {
    publishGlobally: true,                      // Publish modules as global (default false)
    modulePath: './lib',                        // Default path to search for modules
    includeExtensions: ['.mjs', '.js', '.ts']   // Extensions that will be automatically registered
  };
  /** @property {object} failed - holds all modules that failed loading
    **/
  static #failed = {};
  /** @property {object} loaded - holds all modules that successfully loaded
    **/
  static #loaded = {};
  /** @property {object} registry - holds all registered modules
    **/
  static #registry = {};
  /** Static @function basePath()
    *
    * Static getter function basePath - returns the path to the web root (removing node_modules)
    *
    * @return {string}
    **/
  static get basePath() {
    return this.path.substring(0, this.path.indexOf(path.sep + 'node_modules') == -1 ? this.path.lastIndexOf(path.sep) : this.path.indexOf(path.sep + 'node_modules'));
  }
  /** Static @function failed()
    *
    * Static getter function failed - returns object of modules that failed loading
    *
    * @return {object}
    **/
  static get failed() {
    return this.#failed;
  }
  /** Static @function loaded()
    *
    * Static getter function loaded - returns object of modules that successfully loaded
    *
    * @return {object}
    **/
  static get loaded() {
    return this.#loaded;
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
  /** Static @function registered()
    *
    * Static getter function registered - returns object of registered modules
    *
    * @return {object}
    **/
  static get registered() {
    return this.#registry;
  }
  /** Static @function autoLoad(registry)
    *
    * Static function autoLoad - Loads all registered modules
    *   NOTE: Will not fail a promise, but log a warning if a module cannot load
    *
    * @param {object} registry - optionally provide alternative registry
    * @return {object}
    **/
  static autoLoad(registry = this.#registry) {
    return new Promise((resolve, reject) => {
      let promises = [];
      for(const moduleName of Object.keys(registry)) {
        promises.push(this.load(moduleName));
      }
      Promise.allSettled(promises)
        .then(() => {
          if(Object.keys(this.#failed).length) {
            Log.warning({ message: `Namespace failed loading some modules: ${JSON.stringify(Object.keys(this.failed))}` });
          } else {
            Log.success({ message: `Namespace completed loading modules` });
          }
          resolve(this.loaded);
        });
    });
  }
  /** Static @function autoRegister(path,dependency)
    *
    * Static function autoRegister - locates all modules in path and registers these
    *   NOTE: Names of subfolders are considered dependencies
    *
    * @param {string} modulePath - path to examine; default if none given
    * @param {string} basePath - base path for module path; defaults to current directory
    * @return {object}
    **/
  static autoRegister(modulePath = Namespace.default.modulePath, basePath = this.basePath) {
    return new Promise((resolve, reject) => {
      Namespace.registerPath(modulePath, basePath)
        .then((registered) => {
          Log.success(`Namespace completed registering modules`);
          resolve(this.registered);
        }).catch((error) => {
          Log.error(error);
          reject(error);
        });
    });
  }
  /** Static @function isLoaded(moduleName)
    *
    * Static function isLoaded - returns true if module is loaded
    *
    * @param {string} moduleName - name of module
    * @return {bool}
    **/
  static isLoaded(moduleName) {
    return typeof this.#loaded[moduleName] !== 'undefined';
  }
  /** Static @function isRegistered(moduleName)
    *
    * Static function isRegistered - returns true if module is registered
    *
    * @param {string} moduleName - name of module
    * @return {bool}
    **/
  static isRegistered(moduleName) {
    return (typeof this.#registry[moduleName] !== 'undefined');
  }
  /** Static @function load(moduleName)
    *
    * Static function load - returns a promise to load the module
    *
    * @param {string} moduleName - name of module
    * @return {object}
    **/
  static load(moduleName) {
    return new Promise((resolve, reject) => {
      let promises = [];
      if(!Namespace.isLoaded(moduleName)) {
        if(Namespace.isRegistered(moduleName)) {
          let registration = this.#registry[moduleName];
          if(registration.dependency)
            promises.push(Namespace.load(registration.dependency));
          Promise.allSettled(promises)
            .then(() => {
              return import('./' + path.relative(this.path, registration.path));
            }).then((module) => {
              this.#loaded[moduleName] = this[moduleName] = module.default;
              if(this.default.publishGlobally)
                global[moduleName] = this[moduleName];
              resolve(this[moduleName]);
            }).catch((error) => {
              this.#failed[moduleName] = this.#registry[moduleName];
              reject(error);
            });
        } else {
          this.#failed[moduleName] = this.#registry[moduleName];
          reject(`Module ${moduleName} is not registered`);
        }
      }
    });
  }
  /** Static @function register(registration,moduleName)
    *
    * Static function register - returns the registration of the module
    *
    * @param {object} registration - object containing module registration info
    * @param {string} moduleName - (optional) name of module; allows override/alias
    * @return {object}
    **/
  static register(registration, moduleName = registration.name) {
    if(typeof moduleName === 'undefined') {
      return undefined;
    } else {
      return this.#registry[moduleName] = registration;
    }
  }
  /** Static @function registerPath(modulePath,basePath,dependency)
    *
    * Static function registerPath - locates all modules in path and registers these
    *   NOTE: Names of subfolders are considered dependencies
    *
    * @param {string} modulePath - path to examine; default if none given
    * @param {string} basePath - base path for module path; defaults to current directory
    * @param {string} dependency - optional dependency; is autogenerated and should not be supplied
    * @return {object}
    **/
  static registerPath(modulePath = this.default.modulePath, basePath = this.basePath, dependency = undefined) {
    return new Promise((resolve, reject) => {
      let promises = [];
      const relPath = path.relative('.', path.resolve(basePath, modulePath));
      fs.readdir(relPath, { 'encoding': 'utf8', 'withFiletypes': true }, (error, files) => {
        if(error) {
          reject(error);
        } else files.forEach(file => {
          if(fs.statSync(path.join(relPath, file)).isDirectory()) {
            promises.push(this.registerPath(path.join(modulePath, file), basePath, file));
          } else if(this.default.includeExtensions.includes(path.extname(file))) {
            this.register({name: path.basename(file, path.extname(file)), path: './' + path.join(relPath, file), dependency: dependency});
          }
        });
        Promise.allSettled(promises)
          .then(() => {
            resolve(this.registered);
          });
      });
    });
  }
}
