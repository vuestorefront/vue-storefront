describe("basic client path", () => {
  it("should go through basic user flow", () => {
    cy.visit("/");
    cy.get(".modal-close").click();
    indexedDB.deleteDatabase("shop");
    cy.clearLocalStorage();
    cy.get(".product-link").eq(6).click({ force: true });
    cy.get("[data-testid=addToCart]").click();
    cy.get("[data-testid=notificationAction2]").click();
    cy.get("[name=first-name]").type("Firstname");
    cy.get("[name=last-name]").type("Lastname");
    cy.get("[name=email-address]").type("e2e@vuestorefront.io");
    cy.get("[data-testid=personalDetailsSubmit]").click();
    cy.get("[name=street-address]").type("Streetname");
    cy.get("[name=apartment-number]").type("28");
    cy.get("[name=city]").type("Wroclaw");
    cy.get("[name=state]").type("Lowersilesian");
    cy.get("[name=zip-code").type("50-000");
    cy.get("[name=countries]").select("PL");
    cy.get("[name=phone-number]").type("111 222 333");
    cy.get("[data-testid=shippingSubmit]").click();
    cy.get("#sendToShippingAddressCheckbox").check({ force: true });
    cy.get("[data-testid=paymentSubmit]").click();
    cy.get("#acceptTermsCheckbox").check({ force: true });
    cy.get('[data-testid=orderReviewSubmit]').should('not.have.class', 'button-disabled')
  });
});
