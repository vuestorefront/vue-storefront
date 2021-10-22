import generator from '../utils/data-generator';

type Options = {
  as?: string;
  fixture?: any
}

function _intercept(path: string, options?: Options) {
  const as = options?.as ?? generator.uuid;
  options?.fixture ? cy.intercept(path, { fixture: options?.fixture }).as(as) : cy.intercept(path).as(as);
  return `@${as}`;
}

const intercept = {

  customerChangeMyPassword(options?: Options): string {
    return _intercept('**/customerChangeMyPassword', options);
  },

  customerUpdateMe(options?: Options): string {
    return _intercept('**/customerUpdateMe', options);
  },

  customerSignMeIn(options?: Options): string {
    return _intercept('**/customerSignMeIn', options);
  },

  getMe(options?: Options): string {
    return _intercept('**/getMe', options);
  },

  getOrders(options?: Options) {
    return _intercept('**/getOrders', options);
  },

  getProduct(options?: Options): string {
    return _intercept('**/getProduct', options);
  },

  updateCartQuantity(options?: Options): string {
    return _intercept('**/updateCartQuantity', options);
  }
};

export default intercept;
