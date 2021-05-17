context('Update cart', () => {
  beforeEach(function () {
    cy.fixture('test-data/e2e-update-cart').then((fixture) => {
      this.fixtures = {
        data: fixture
      };
    });
  });

});
