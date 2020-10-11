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
