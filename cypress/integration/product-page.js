/* eslint no-undef: 0 */
describe('product page', () => {
  beforeEach(() => {
    cy.visit('/p/6dbfdfd5-2e34-4dd6-ac18-c0cc98b84d78/poloralphlauren-sweater-A40S4603-pink').wait(2000);
  });
  it('should verify that all information are visible', () => {
    cy.location('pathname').should('include', 'poloralphlauren-sweater');
    cy.get('.sf-heading__title').contains('Sweater Polo Ralph Lauren pink');
    cy.get('.sf-price__value').contains('$160.00');
    cy.get('.product__gallery > .sf-image > img').should(
      'have.attr',
      'src',
      'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/079922_1_large.jpg'
    );
    cy.get('[data-cy=product-color_update]').should('have.css', 'background-color', 'rgb(255, 192, 203)');
    cy.get('[data-cy=product-select_size]').first().contains('XXS');
    cy.get('.sf-select__options').children().should(($sizesFormOptions) => {
      expect($sizesFormOptions).to.have.length(8);
      expect($sizesFormOptions.eq(1)).to.contain('XS');
      expect($sizesFormOptions.eq(4)).to.contain('L');
      expect($sizesFormOptions.eq(7)).to.contain('XXXL');
    });

    cy.get('[data-cy=related-products-carousel]').should('exist');
    cy.get('.sf-product-card__title').eq(4).contains('Sweater Kaos blue');
    cy.get('[aria-label="previous"]').click();
    cy.get('.sf-product-card__title').eq(10).contains('Sweater Moncler red');
    cy.scrollTo('bottom');
    cy.get('#footer')
      .should(($el) => {
        expect($el).to.be.visible;
      });
  });
  it('should add and remove product from wishlist', () => {
    cy.get('[data-cy=product-btn_save-later]').click();
    // cy.get('[data-testid=notificationMessage]').contains('Product has been added to wishlist!')
  });
  it('should add and remove product from compare list', () => {
    cy.get('[data-cy=product-btn_add-to-compare]').click();
    // cy.get('[data-testid=notificationMessage]').contains('Product has been added to the compare!')
  });
  it('should edit product variant', () => {
    cy.get('[data-cy=product-select_size]').click();
    cy.get('.sf-select__options > :nth-child(4)').click().wait(1000);
    cy.url().should('include', 'size=M');
    cy.get('[data-cy=product-color_update]').click();
    cy.url().should('include', 'pink');
  });
  it('should add product to cart', () => {
    cy.get('[data-cy=product-cart_add]').dblclick().wait(1000);
    // cy.get('[data-testid=notificationMessage]').contains('Product has been added to the cart!' )
    cy.get('.sf-badge').contains('1');
    cy.get('.sf-header__action').eq(2).click();
    cy.get('[data-cy=collected-product-cart-sidebar]').contains('Sweater Polo Ralph Lauren pink');
  });
});
