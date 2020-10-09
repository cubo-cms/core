'use strict'

import Controller from '../Entity/Controller.mjs';

export default class ArticleController extends Controller {
  constructor(data) {
    super(data);
  }
  get name() {
    return this.constructor.name;
  }
}
