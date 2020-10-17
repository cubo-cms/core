/** @package        @cubo-cms/core
  * @version        0.0.9
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
  static serialize(data) {
    let crumbs = [];
    for(let property of Object.keys(data)) {
      crumbs.push(property + (data[property] && data[property] !== true ? '=' + data[property] : ''));
    }
    return crumbs.join('; ');
  }
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
