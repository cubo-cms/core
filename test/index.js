'use strict'

import Namespace from '../index.mjs';

console.log(Namespace.registered);

async function loadFramework() {
  await Namespace.autoLoad();
}

loadFramework()
  .finally(() => {
    let a = new Core();
  });
