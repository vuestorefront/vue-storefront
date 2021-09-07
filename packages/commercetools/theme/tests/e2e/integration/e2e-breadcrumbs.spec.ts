import page from '../pages/factory';

const testsCases = [
  'category',
  'subcategory',
  'nested subcategory'
];

const breadcrumbsNames = [
  'Home',
  'Women',
  'Clothing',
  'Jackets'
];

context(['regression'], 'Breadcrumbs', () => {
  beforeEach(function () {
    cy.fixture('test-data/e2e-breadcrumbs').then((fixture) => {
      this.fixtures = {
        data: fixture
      };
    });
  });

  testsCases.forEach(testCase => {
    it(`Should display breadcrumbs list properly - ${testCase}`, function () {
      const data = this.fixtures.data[this.test.title];
      const category = page.category(data.category, data.subcategory);

      category.visit();

      page.components.breadcrumbs.container.should('not.be.empty');
      page.components.breadcrumbs.listItems.should('have.length', data.expectedLength);

      page.components.breadcrumbs.listItems.each((item, index) => {
        expect(item.text()).to.contain(breadcrumbsNames[index]);
      });
    });
  });
});
