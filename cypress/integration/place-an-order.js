/* eslint no-undef: 0 */

describe('shopping path', () => {
  beforeEach(() => {
    cy.visit('/p/38143c0c-c9b0-448c-93cd-60eb90d8da57/aspesi-shirt-h805-white').wait(2000);
    cy.url().should('include', '/p/38143c0c-c9b0-448c-93cd-60eb90d8da57/aspesi-shirt-h805-white');
    cy.get('[data-cy=product-cart_add]').click().wait(500);
    cy.get('.sf-header__action').eq(2).click();
    cy.get('[data-cy=cart-sidebar-btn_checkout]').click({ force: true });
    cy.scrollTo('top');
  });
  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.reload(true);
  });
  it('Place an order as a guest', () => {
    const firstName = cy.get('[data-cy=personal-details-input_firstName]');
    const lastName = cy.get('[data-cy=personal-details-input_lastName]');
    firstName.clear().type('John');
    lastName.clear().type('Doe');
    cy.get('[data-cy=personal-details-input_email]').clear().type('john@doe.com');
    cy.get('[data-cy=personal-details-btn_continue]').click();
    cy.wait(500);

    cy.url().should('include', '/shipping');
    cy.get('[data-cy=shipping-details-input_firstName]').type('John');
    cy.get('[data-cy=shipping-details-input_lastName]').type('Doe');
    cy.get('[data-cy=shipping-details-input_streetName]').type('Dmowskiego');
    cy.get('[data-cy=shipping-details-input_apartmanet]').type('5');
    cy.get('[data-cy=shipping-details-input_city]').type('Wrocław');
    cy.get('[data-cy=shipping-details-input_postalCode]').type('50-500');
    cy.get('[data-cy=shipping-details-input_state]').type('Dolnośląskie');
    cy.get('[data-cy=shipping-details-input_phone]').type('666-666-666');
    cy.get('[data-cy=shipping-details-select_country]').click().wait(500);
    cy.get('.sf-select__options > :nth-child(2)').click();
    cy.get('ul.sf-select__options').children().should((countryFormOptions) => {
      expect(countryFormOptions).to.have.length(4)
      expect(countryFormOptions.eq(0)).to.contain('United States')
    })
    cy.get('.form__radio-group').find('[name="shippingMethod"]').first().check({ force: true }).should('be.checked');
    cy.get('[data-cy=shipping-btn_continue]').click({ force: true });

    cy.url().should('include', '/payment');
    cy.wait(1000);
    cy.get('[name="copyShippingAddress"]').check({force: true}).should('be.checked');
    cy.get('[data-cy="payment-radio_paymentMethod"]').eq(0).click().should('have.class', 'sf-radio--is-active');
    cy.get('[data-cy=payment-btn_review]').click({ force: true });

    cy.url().should('include', '/order-review');
    cy.wait(1000);
    cy.get('[name="terms"]').check({force: true}).should('be.checked');
    cy.get('[data-cy=order-review-btn_summary-conitnue]').click();

    cy.url().should('include', '/thank-you');
    cy.get('.checkout__main').contains('thank you page');
  });
  it('Place an order for a Customer', () => {
    cy.get('[data-cy=personal-details-btn_login]').click();
    // cy.get('[data-testid=notificationMessage]').contains('You are logged in!');
    // IN PROGRES...
  });
});
