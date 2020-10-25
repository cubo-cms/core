/** @package        @cubo-cms/core
  * @version        0.2.14
  * @copyright      2020 Cubo CMS <https://cubo-cms.com/COPYRIGHT.md>
  * @license        MIT license <https://cubo-cms.com/LICENSE.md>
  * @author         Papiando <info@papiando.com>
  * @module         Cookie
  * @description    Cookie class - Helper class for cookies
  **/

/** @module Cookie
  *
  * Cookie class - Helper class for cookies
  **/
export default class Cookie {
  /** Static @function serialize(data)
    *
    * Static function serialize - converts object to cookie string
    *
    * @param {object} data
    * @return {string}
    **/
  static serialize(data) {
    let crumbs = [];
    for(let property of Object.keys(data)) {
      crumbs.push(property + (data[property] && data[property] !== true ? '=' + data[property] : ''));
    }
    return crumbs.join('; ');
  }
  /** Static @function unserialize(data)
    *
    * Static function unserialize - converts cookie string to object
    *
    * @param {string} data
    * @return {object}
    **/
  static unserialize(data = '') {
    let crumbs = {};
    for(let crumb of data.split('; ')) {
      if(crumb) {
        let [property, value] = crumb.split('=', 2);
        crumbs[property] = value;
      }
    }
    return crumbs;
  }
}
