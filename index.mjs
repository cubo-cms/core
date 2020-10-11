/** @package        @cubo-cms/core
  * @version        0.0.4
  * @copyright      2020 Cubo CMS <https://cubo-cms.com/COPYRIGHT.md>
  * @license        MIT license <https://cubo-cms.com/LICENSE.md>
  * @author         Papiando <info@papiando.com>
  * @description    Integrates packages by auto-registering all modules
  **/

import { dirname } from 'path';
import { fileURLToPath } from 'url';

import Namespace from './module/Namespace.mjs';

const basePath = dirname(fileURLToPath(import.meta.url));

Namespace.autoRegister('module', basePath);

export default Namespace;
