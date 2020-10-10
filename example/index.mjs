'use strict'

import Namespace from '../Namespace.mjs';

console.log('');
console.log('Registered modules:');
console.log('');
console.log(Namespace.registered);

await Namespace.autoLoad();

console.log('');
console.log('Loaded modules:');
console.log('');
console.log(Namespace.loaded);
console.log('');

let a = new Log({ message: 'Message to console', type: 'info' });

process.exit(0);
