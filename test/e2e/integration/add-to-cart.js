/* eslint no-undef: 0 */
describe('add to cart', () => {
  it('verify that the configurable product is added to cart', () => {
    cy.visit('/p/WS01/gwyn-endurance-tee-1577/WS01');
    cy.get('[data-testid=productName]').contains('Gwyn Endurance Tee')
    cy.wait(1000)
    cy.get('[aria-label="Select color Green"]').click();
    cy.get('[aria-label="Select size L"]').click();
    cy.get('[data-testid=addToCart]').click();
    cy.get('[data-testid=notificationMessage]').should('contain',
      'Product has been added to the cart!');
    cy.get('[data-testid=openMicrocart]').click({ force: true });
    cy.get('[data-testid=productSku]').contains('WS01-L-Green');
    cy.get('[data-testid=closeMicrocart]').click();
  });

  it('verify that quantity is updated', () => {
    cy.get('[data-testid=addToCart]').click();
    cy.get('[data-testid=notificationMessage]').should('contain',
      'Product quantity has been updated!'
    );
    cy.get('[data-testid=openMicrocart]').click({ force: true });
    cy.get('input[type=number]').should('have.value', '2');
  });

  it('verify that the bundle product is added to cart', () => {
    cy.visit('/p/24-WG080/sprite-yoga-companion-kit-45');
    cy.get('[data-testid=addToCart]').click();
    cy.get('[data-testid=notificationMessage]', { timeout: 10000 }).contains(
      'This product is out of stock.'
    );
    cy.get('[data-testid=notificationAction1]').click();

    cy.get('[data-testid=bundle-options]').children().as('allOptions')
    cy.get('@allOptions').first().find('[data-testid=bundle-single-option]').its(1).as('ballOptions')
      .find('input[type=radio]').click({ force: true })
    cy.get('#bundleOptionQty_1')
      .clear()
      .type('2');
    cy.get('@ballOptions').should(($ballOptions) => {
      const text = $ballOptions.text()
      expect(text).to.include('Sprite Stasis Ball 65')
    })
    cy.get('@allOptions').eq(-2).find('[data-testid=custom-single-option]').its(2).as('strapOptions')
      .find('input[type=radio]').click({ force: true })
    cy.get('@strapOptions').should(($strapOptions) => {
      const text = $strapOptions.text()
      expect(text).to.include('Sprite Yoga Strap 10 foot')
    })
    cy.get('#bundleOptionQty_4')
      .clear()
      .type('3');
    cy.get('[data-testid=addToCart]').click();
    cy.get('[data-testid=notificationMessage]').contains(
      'Product has been added to the cart!'
    );
    cy.get('[data-testid=notificationAction1]').click();
    cy.get('[data-testid=openMicrocart]').click({ force: true });
    cy.get('[class=prices]').contains('168.51');
    cy.get('[data-testid="productLink"]').should('contain', 'Sprite Yoga Companion Kit')
    cy.get('[data-testid=closeMicrocart]').click();
  });
});
