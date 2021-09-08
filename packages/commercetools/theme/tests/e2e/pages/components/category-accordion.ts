import { el } from '../utils/element';

class CategoryAccordion {
  get container(): Cypress.Chainable {
    return el('categories-accordion');
  }
  get categories(): Cypress.Chainable {
    return el('categories-accordion', 'button');
  }
  category(name: string): Cypress.Chainable {
    return this.categories.contains(name);
  }
  subCategories(): Cypress.Chainable {
    return el('categories-accordion', '.sf-accordion-item__content ul li').find('a');
  }
  subCategoryName(subCategoryName: string): Cypress.Chainable {
    return this.subCategories().contains(subCategoryName);
  }
}

export default new CategoryAccordion();
