/* eslint no-undef: 0 */
context('My account', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[aria-label="account"]').click();
    cy.get('[data-cy=login-btn_login-into-account]').click().wait(500);
    cy.get('[data-cy=login-input_email]').clear().type('next@test.io');
    cy.get('[data-cy=login-input_password]').clear().type('Pass123');
    cy.get('[data-cy=login-btn_submit]').click();
    cy.get('[aria-label="account"]').click().wait(500);
    cy.location('pathname').should('include', '/my-account');
  });
  it('verification of personal details', () => {
    cy.get('[aria-label="account"]').click().wait(500);
    cy.location('pathname').should('include', '/my-account');
    cy.get('[data-cy=my-profile-input_firstName]').should('be.visible');
    cy.get('[data-cy=my-profile-input_lastName]').should('be.visible');
    cy.get('[data-cy=my-profile-input_email]').should('be.visible');
    cy.get('[data-cy=my-profile-btn_update]').should('be.visible').and('contain', 'Update personal data');
  });
  it('switching between tabs', () => {
    cy.get('.sf-content-pages__sidebar > :nth-child(2) > .sf-list > :nth-child(2) > .sf-menu-item > .sf-menu-item__label').click();
    cy.location('pathname').should('include', '/shipping-details').wait(500);
    cy.get('[data-cy=shipping-details-btn_add]').should('be.visible').and('contain', 'Add new address');
    cy.get('.sf-content-pages__sidebar > :nth-child(2) > .sf-list > :nth-child(3) > .sf-menu-item > .sf-menu-item__label').click();
    cy.location('pathname').should('include', '/loyalty-card').wait(1000);
    cy.get('.sf-tabs').should('be.visible').and('contain', 'Loyalty Card');
    cy.get('.sf-content-pages__sidebar > :nth-child(2) > .sf-list > :nth-child(4) > .sf-menu-item > .sf-menu-item__label').click();
    cy.location('pathname').should('include', '/my-newsletter').wait(500);
    cy.get('[data-cy=newsletter-btn_join]').should('be.visible').and('contain', 'Join Newsletter');
    cy.get(':nth-child(3) > .sf-list > :nth-child(1) > .sf-menu-item > .sf-menu-item__label').click();
    cy.location('pathname').should('include', '/order-history').wait(500);
    cy.get('[data-cy=order-history-btn_start]').should('be.visible').and('contain', 'Start shopping');
    cy.get(':nth-child(3) > .sf-list > :nth-child(2) > .sf-menu-item > .sf-menu-item__label').click();
    cy.location('pathname').should('include', '/my-reviews').wait(500);
    cy.get('.sf-tabs').should('be.visible').and('contain', 'My reviews');
    cy.get(':nth-child(4) > .sf-list > .sf-list__item > .sf-menu-item').click();
    cy.url().should('eq', 'https://lovecrafts-demo.storefrontcloud.io/');
  });
  it('add and delele new address', () => {
    cy.get('.sf-content-pages__sidebar > :nth-child(2) > .sf-list > :nth-child(2) > .sf-menu-item > .sf-menu-item__label').click().wait(500);
    cy.get('[data-cy=shipping-details-btn_add]').click();
    cy.get('[data-cy=shipping-details-input_firstName]').type('first');
    cy.get('[data-cy=shipping-details-input_lastName]').type('last');
    cy.get('[data-cy=shipping-details-input_streetName]').type('street');
    cy.get('[data-cy=shipping-details-input_apartment]').type('5');
    cy.get('[data-cy=shipping-details-input_city]').type('Wrocław');
    cy.get('[data-cy=shipping-details-input_state]').type('state');
    cy.get('[data-cy=shipping-details-input_zipCode]').type('55-555');
    cy.get('[data-cy=shipping-details-select_country]').click();
    cy.get('.sf-select__options > :nth-child(1)').click();
    cy.get('[data-cy=shipping-details-input_phoneNumber]').type('666555444');
    cy.get('[data-cy=shipping-details-btn_update]').click();
    cy.get('.sf-tabs__content__tab').should('contain', 'first last');
    cy.get('[data-cy=shipping-details-btn_delete]').eq(2).click();
    cy.get('.sf-tabs__content__tab').should('not.contain', 'first last');
  });
  it('join newsletter', () => {
    cy.get('.sf-content-pages__sidebar > :nth-child(2) > .sf-list > :nth-child(4) > .sf-menu-item > .sf-menu-item__label').click();
    cy.get(':nth-child(1) > .sf-checkbox__container > .sf-checkbox__checkmark').should('have.class', 'sf-checkbox__checkmark--is-active');
    cy.get('[data-cy=newsletter-btn_join]').click();
  });
  it('verification of order history', () => {
    cy.get(':nth-child(3) > .sf-list > :nth-child(1) > .sf-menu-item > .sf-menu-item__label').click();
    cy.get('.sf-tabs').should('contain', 'Returns');
    cy.get('[data-cy=order-history-btn_start]').click();
  });
});
