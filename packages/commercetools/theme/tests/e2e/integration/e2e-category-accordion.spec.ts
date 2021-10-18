import page from '../pages/factory';

context(['regression'], 'Category page accordion', () => {
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

  it('Should successfully display category items', function () {
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
        category.subCategories.forEach(subCategory => {
          page.components.categoryAccordion.subCategoryName(subCategory).should('be.visible');
        });
      });
    });
  });
});
