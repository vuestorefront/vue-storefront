import generator from '../utils/data-generator';

function _intercept(path: string, alias?: string) {
  const as = alias ?? generator.uuid;
  cy.intercept(path).as(as);
  return `@${as}`;
}

const intercept = {
  getProduct(as?: string): string {
    return _intercept('/getProduct', as);
  },

  updateCartQuantity(as?: string): string {
    return _intercept('/updateCartQuantity', as);
  }
};

export default intercept;
