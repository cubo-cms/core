/** @package        @cubo-cms/core
  * @version        0.0.6
  * @copyright      2020 Cubo CMS <https://cubo-cms.com/COPYRIGHT.md>
  * @license        MIT license <https://cubo-cms.com/LICENSE.md>
  * @author         Papiando <info@papiando.com>
  * @description    Example showing how modules are automatically registered and loaded
  **/
'use strict'

import Namespace from '../index.mjs';

console.log('');
console.log('Registered modules:');
console.log('');
console.log(Namespace.registered);
console.log('');

await Namespace.autoLoad();

console.log('');
console.log('Loaded modules:');
console.log('');
console.log(Namespace.loaded);
console.log('');

Log.success('Invoking autoloaded module \"Log\"');

process.exit(0);
