Cubo CMS
========

## Core package

### Introduction
This module is the actual core for the Cubo CMS and holds several core classes that the framework depends upon.
But even if not using the actual framework, this package can be used to automatically register and load modules (i.e. object classes) into a common namespace.

Note: this package currently only supports ES6

### Install instructions
Add this package as a dependency in your *package.json* and run:
```
npm install
```
The package will automatically register its own core classes.

### Usage
Your own modules can easily be registered and loaded using the *Namespace* class. The example below shows how.
Automatic registration works by scanning a folder and its subfolders for ES6 scripts. Each subfolder name refers to a class dependency, which is why these should be using the same name as the class it extends.
This will result in the following code:
``` index.mjs
import '@cubo-cms/core';

// Register modules under the *./module* folder
Namespace.autoRegister();

// Load all modules including dependencies
await Namespace.autoLoad();

// Use the classes
const new_customer = new Customer();
```
Note: Using a top-level await requires node.JS version 14.8 or newer.

Remember using a module folder structure as shown in the example below:
```
/
|
+-- module/
    |
    +-- Person.mjs
    |
    +-- Person/
        |
        +-- Customer.mjs
```
