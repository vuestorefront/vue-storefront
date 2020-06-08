/* eslint no-undef: 0 */
describe('cart sidebar', () => {
  beforeEach(() => {
    cy.visit('/p/9c1881eb-139d-4d29-bbb4-01b1ff51de03/moschino-tshirt-b02033717-black').wait(2000);
    cy.url().should('include', '/p/9c1881eb-139d-4d29-bbb4-01b1ff51de03/moschino-tshirt-b02033717-black');
    cy.get('[data-cy=product-cart_add]').click().wait(500);
    cy.get('.sf-header__action').eq(2).click().wait(500);
  });
  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.reload(true);
  });
  it('product has been added to the cart', () => {
    cy.get('.sf-collected-product__title').contains('T-Shirt Moschino Cheap And Chic black');
    cy.get('.my-cart__total-items').contains('1');
    cy.get('.sf-collected-product__aside > .sf-image > img').should(
      'have.attr',
      'src',
      'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/072750_1_large.jpg'
    );
    cy.get('.sf-collected-product__details > .sf-price > .sf-price__value--special')
      .should('contain', '$186.25')
      .then((value) => {
        cy.get('.sf-property > .sf-price > .sf-price__value').should('contain', value.text());
      });
  });
  it(' quantity should be updated', () => {
    cy.get('.sf-collected-product__quantity-wrapper > .sf-quantity-selector > :nth-child(3)').click();
    cy.get('.my-cart__total-items').contains('2');
    cy.get('.sf-collected-product__quantity-wrapper  .sf-quantity-selector  .sf-input  .sf-input__wrapper  input').click().clear().wait(500).type('5');
    cy.get('.my-cart__total-items').contains('5');
  });
  it('product has been removed from the cart', () => {
    cy.get('[data-cy=collected-product-cart-sidebar] > .sf-circle-icon').click();
    cy.get('.empty-cart__label').contains('Your bag is empty');
    cy.get('[data-cy=cart-sidebar-btn_start-shopping]').should('be.visible');
  });
  it('product has been saved for later', () => {
    cy.get('[data-cy=cart-sidebar-btn_save-later]').click();
  });
});
