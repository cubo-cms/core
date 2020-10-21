Cubo CMS
========

## Core package

### Introduction
This module is the actual core for the Cubo CMS and holds several core classes that the framework depends upon.

But even if not using the actual framework, this package can be used to automatically register and load modules (i.e. object classes) into a common namespace.

Note: this package currently only supports ES6

### Install instructions
Via npm include the pacakge by running:
```
npm install @cubo-cms/core@latest -P
```
The package will automatically register (not load) its own core classes.

### Usage
The Core package is completely written in ECMAScript6. To import from ECMAScript6 modules, use:

```
import Namespace from '@cubo-cms/core
```

### Namespace Module
Your own modules can easily be registered and loaded using the *Namespace* class. The example below shows how.

Automatic registration works by scanning a folder and its subfolders for ES6 scripts. Each subfolder name refers to a class dependency, which is why these should be using the same name as the class it extends.

This will result in the following code:
``` index.mjs
import Namespace from '@cubo-cms/core';

// Register modules under the "./lib" folder tree
Namespace.autoRegister('./lib');

// Load all modules including dependencies
await Namespace.autoLoad();

// Use the classes
const new_customer = new Customer();
```
Note: Using a top-level await requires node.JS version 14.8 or newer.

Remember to use a module folder structure as shown in the example below:
```
/
|
+-- lib/
    |
    +-- Person.mjs
    |
    +-- Person/
        |
        +-- Customer.mjs
```
In the aforementioned example folder structure, you can determine that the Customer module depends on the Person module. Speaking of classes this relates to `class Customer extends Person`.

There is no need (although it is possible) to have folder structures deeper than this.
