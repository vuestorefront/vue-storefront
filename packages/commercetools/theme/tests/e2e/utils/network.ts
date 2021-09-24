import generator from '../utils/data-generator';

function _intercept(path: string, alias?: string) {
  const as = alias ?? generator.uuid;
  cy.intercept(path).as(as);
  return `@${as}`;
}

const intercept = {

  customerChangeMyPassword(as?: string): string {
    return _intercept('/customerChangeMyPassword', as);
  },

  customerUpdateMe(as?: string): string {
    return _intercept('/customerUpdateMe', as);
  },

  getMe(as?: string): string {
    return _intercept('/getMe', as);
  },

  getProduct(as?: string): string {
    return _intercept('/getProduct', as);
  },

  updateCartQuantity(as?: string): string {
    return _intercept('/updateCartQuantity', as);
  }
};

export default intercept;
