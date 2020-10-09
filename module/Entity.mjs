'use strict'

export default class Entity {
  constructor(data) {
    console.log('Class ' + this.name);
  }
  get name() {
    return this.constructor.name;
  }
}
