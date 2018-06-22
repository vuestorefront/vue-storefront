describe('login path', () => {
  it('should login user', () => {
    cy.visit('/');
    cy.get('.modal-close').click();
    indexedDB.deleteDatabase('shop');
    cy.clearLocalStorage();
    cy.get('.header button').last().click();
    cy.get('[name=email]').type('test@testt.com');
    cy.get('[name=password]').type('Test1234');
    cy.get('#remember').check({ force: true });
    cy.get('.modal form').submit();
    cy.get(".notification.success").should("be.visible");
  });
});
