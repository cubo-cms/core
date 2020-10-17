/** @package        @cubo-cms/core
  * @version        0.0.9
  * @copyright      2020 Cubo CMS <https://cubo-cms.com/COPYRIGHT.md>
  * @license        MIT license <https://cubo-cms.com/LICENSE.md>
  * @author         Papiando <info@papiando.com>
  * @description    Integrates packages by auto-registering all modules
  **/

import('./lib/Namespace.mjs')
  .then((ns) => {
    ns.default.autoRegister('./lib', __dirname);
    console.log(ns.default.registered);
    module.exports = ns.default;
  });
