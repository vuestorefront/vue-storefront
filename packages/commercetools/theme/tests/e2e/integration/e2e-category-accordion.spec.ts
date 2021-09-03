import page from '../pages/factory';

context('Category page accordion', () => {
  beforeEach(function () {
    cy.fixture('test-data/e2e-category-accordion').then((fixture) => {
      this.fixtures = {
        data: fixture
      };
    });
  });

  it('Should successfully show category accordion list', function () {
    const data = this.fixtures.data[this.test.title];
    const category = page.category(data.header.category);
    category.visit();
    page.components.categoryAccordion.container.should('be.visible');
  });

  it('Should successfully exists category items', function () {
    const data = this.fixtures.data[this.test.title];
    const category = page.category(data.header.category);
    category.visit();
    data.categories.forEach(category => {
      page.components.categoryAccordion.category(category.name).should('be.visible');
    });
  });

  it('Should successfully open subcategories for items', function () {
    const data = this.fixtures.data[this.test.title];
    const category = page.category(data.header.category);
    category.visit();
    page.components.categoryAccordion.categories.first().click();
    data.categories.forEach(category => {
      page.components.categoryAccordion.category(category.name).click().then(() => {
        cy.wait(2000);
        category.subCategories.forEach(subCategory => {
          page.components.categoryAccordion.subCategoryName(subCategory).should('be.visible');
        });
      });
    });
  });
});
