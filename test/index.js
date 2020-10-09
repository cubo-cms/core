import Core from '../index.js';

/*
Core.register({name:'Entity',path:'module/Entity.mjs'});
Core.register({name:'Application',path:'module/Application.mjs',dependency:'Entity'});
Core.register({name:'Controller',path:'module/Controller.mjs',dependency:'Entity'});
Core.register({name:'ArticleController',path:'module/ArticleController.mjs',dependency:'Controller'});
console.log(Core.registered);
*/

//Core.autoRegister();
//console.log(Core.registered);

Core.autoLoad().then(console.log(Core.loaded));
