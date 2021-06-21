import page from '../pages/factory';
import intercept from '../utils/network';

context(['regression'], 'Product page', () => {
  beforeEach(function () {
    cy.fixture('test-data/e2e-product-page').then((fixture) => {
      this.fixtures = {
        data: fixture
      };
    });
    cy.clearLocalStorage();
  });

  it('Should contain all size options', function () {
    const data = this.fixtures.data[this.test.title];
    page.product(data.product.id, data.product.slug).visit();
    page.product().sizeOptions.then(options => {
      const productSizes = [...options].map(option => option.value);
      expect(productSizes).to.deep.eq(data.product.attributes.size);
    });
  });

  it('Should select correct size option', function () {
    const data = this.fixtures.data[this.test.title];
    page.product(data.product.id, data.product.slug).visit();
    page.product().sizeSelect.select(data.product.attributes.size);
    cy.url().should('contain', `size=${data.product.attributes.size}`);
    page.product().sizeSelect.should('have.value', data.product.attributes.size);
  });

  it('Should add correct variant to cart', function() {
    const data = this.fixtures.data[this.test.title];
    const getProductReq = intercept.getProduct();
    page.product(data.product.id, data.product.slug).visit();
    page.product().sizeSelect.select(data.product.attributes.size).then(() => {
      cy.wait(getProductReq);
    });
    page.product().addToCartButton.click();
    page.product().header.openCart();
    page.components.cart.productProperties.should('be.visible').then(() => {
      page.components.cart.product().each((product) => {
        page.components.cart.productSizeProperty(product).should('contain', data.product.attributes.size);
        page.components.cart.productColorProperty(product).should('contain', data.product.attributes.color);
      });
    });
  });
});
