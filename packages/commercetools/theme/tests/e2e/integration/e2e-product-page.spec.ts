import page from '../pages/factory';

before(() => {
  cy.fixture('test-data/e2e-product-page').then((fixture) => {
    cy.fixtures = {
      data: fixture
    };
  });
  cy.clearLocalStorage();
});

context(['regression'], 'Product page', () => {

  it('Should contain all size options', () => {
    const data = cy.fixtures.data['Should contain all size options'];
    page.product(data.product.id, data.product.slug).visit();
    page.product().sizeOptions.then(options => {
      const actual = [...options].map(o => o.value);
      expect(actual).to.deep.eq(data.product.attributes.size);
    });
  });

  it('Should select proper size option', () => {
    const data = cy.fixtures.data['Should select proper size option'];
    page.product(data.product.id, data.product.slug).visit();
    page.product().sizeSelect.select(data.product.attributes.size);
    cy.url().should('contain', `size=${data.product.attributes.size}`);
    page.product().sizeSelect.should('have.value', data.product.attributes.size);
  });

  it('Should add proper variant to cart', () => {
    const data = cy.fixtures.data['Should add proper variant to cart'];
    page.product(data.product.id, data.product.slug).visit();
    page.product().sizeSelect.select(data.product.attributes.size);
    cy.wait(1000);
    page.product().addToCartButton.click();
    page.product().header.openCart();
    page.components.cart.productProperties.should('be.visible').then(() => {
      page.components.cart.getProductPropertiesData().then(d => {
        expect(d).to.deep.eq(data.product.attributes);
      });
    });
  });

});
