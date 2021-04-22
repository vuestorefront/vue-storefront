import { el } from '../utils/element';

class Cart {

  get product(): Cypress.Chainable {
    return el('collected-product');
  }

  get goToCheckoutButton(): Cypress.Chainable {
    return el('go-to-checkout-btn');
  }

  get productProperties(): Cypress.Chainable {
    return el('collected-product', '.sf-property');
  }

  async getProductPropertiesData(): Promise<{ [key: string]: string }> {
    const propertiesData = () => {
      const data = {};
      this.productProperties.each((property) => {
        data[`${property.children()[0].textContent.trim()}`] = `${property.children()[1].textContent.trim()}`;
      });
      return data;
    };
    return propertiesData();
  }

}

export default new Cart();
