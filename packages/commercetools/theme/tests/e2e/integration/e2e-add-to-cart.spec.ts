import page from '../pages/factory';

context(['regression'], 'Add product to cart', () => {
  beforeEach(function () {
    cy.fixture('test-data/e2e-add-to-cart').then((fixture) => {
      this.fixtures = {
        data: fixture
      };
    });
  });

  it('Should successfully add product to cart - Category grid view', function() {
    const data = this.fixtures.data[this.test.title];
    const category = page.category(data.product.category);
    category.visit();
    category.addToCart(data.product.name);
    category.header.openCart();
    page.components.cart.product(data.product.name).should('be.visible');
  });

  it('Should successfully add product to cart - Category list view', function() {
    const data = this.fixtures.data[this.test.title];
    const category = page.category(data.product.category);
    category.visit();
    category.changeView('list');
    category.addToCart(data.product.name);
    category.header.openCart();
    page.components.cart.product(data.product.name).should('be.visible');
  });

  it('Should successfully add product to cart - Product details page', function() {
    const data = this.fixtures.data[this.test.title];
    page.product(data.product.id, data.product.slug).visit();
    page.product().addToCartButton.click();
    page.product().header.openCart();
    page.components.cart.product(data.product.name).should('be.visible');
  });
});
