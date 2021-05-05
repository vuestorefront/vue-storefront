import { el } from './utils/element';
import Base from './base';

type View = 'tiles' | 'list'

export class Category extends Base {

  private readonly _category: string;
  private _view: View = 'tiles';

  constructor(category?: string) {
    super();
    if (category) this._category = category;
  }

  set view(view: View) {
    this._view = view;
  }

  get view(): View {
    return this._view;
  }

  get category(): string {
    return this._category;
  }

  get path(): string {
    return `/c/${this.category}`;
  }

  get products(): Cypress.Chainable {
    return el('category-product-card', 'a');
  }

  get selectors(): { [key: string]: { [key in View]: string } } {
    return {
      productCard: {
        tiles: '.sf-product-card',
        list: '.sf-product-card-horizontal'
      },
      addToCardButton: {
        tiles: '.sf-product-card__add-button',
        list: '.sf-add-to-cart__button'
      }
    };
  }

  viewIcon(view: View): Cypress.Chainable {
    return el(`${view}-icon`);
  }

  changeView(view: View): Cypress.Chainable {
    this.view = view;
    return this.viewIcon(view).click();
  }

  product(name: string): Cypress.Chainable {
    return this.products.contains(name);
  }

  addToCart(name: string): Cypress.Chainable {
    return this.product(name).parents(this.selectors.productCard[this.view])
      .find(this.selectors.addToCardButton[this.view])
      .click();
  }

}
