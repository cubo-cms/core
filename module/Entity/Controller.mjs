'use strict'

import Entity from '../Entity.mjs';

export default class Controller extends Entity {
  constructor(data) {
    super(data);
  }
  get name() {
    return this.constructor.name;
  }
}
