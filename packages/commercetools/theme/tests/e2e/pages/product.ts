import Base from './base';
import { el } from './utils/element';

export class Product extends Base {

  private _id: string;
  private _slug: string;

  constructor(id?: string, slug?: string) {
    super();
    if (id) this.id = id;
    if (slug) this.slug = slug;
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get slug(): string {
    return this._slug;
  }

  set slug(slug: string) {
    this._slug = slug;
  }

  get path() {
    return `/p/${this.id}/${this.slug}`;
  }

  get addToCartButton(): Cypress.Chainable {
    return el('product_add-to-cart');
  }

  get sizeSelect(): Cypress.Chainable {
    return el('size-select', 'select');
  }

  get sizeOptions(): Cypress.Chainable {
    return el('size-select', 'select option');
  }

}
