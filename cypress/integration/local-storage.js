describe("local-storage", () => {
  it("Items added to the cart should be kept.", () => {
    cy.visit("p/WS11/diva-gym-tee-1545/WS11");
    indexedDB.deleteDatabase("shop");
    indexedDB.deleteDatabase("carts");
    cy.clearLocalStorage();
    cy.get('.color[aria-label="Select color Yellow"]')
      .click()
      .should("have.class", "active");
    cy.get('[aria-label="Select size S"]').click();
    cy.get(":nth-child(2) > .variants-label > .weight-700").should(
      "contain",
      "S"
    );
    cy.get("[data-testid=addToCart]").click();
    cy.get("[data-testid=notificationMessage]").should(
      "contain",
      "Product has been added to the cart!"
    );
    cy.get('header [aria-label="Open microcart"]').click({ force: true });
    cy.get(".microcart").should("have.class", "active");
    cy.reload();
    cy.get('header [aria-label="Open microcart"]').click({ force: true });
    cy.get(".sku").should("contain", "WS11-S-Yellow");
    cy.get(":nth-child(1) > .middle-xs > .hidden-xs").click();
    cy.get(".details .cl-accent .weight-700.hidden")
      .click({ force: true })
      .should("contain", "1");
    cy.get("input.h6")
      .click()
      .clear()
      .type("2")
      .blur();
    cy.reload();
    cy.get('header [aria-label="Open microcart"]').click({ force: true });
    cy.get(".col-xs > .h5 > .weight-700").should("contain", "2");
    cy.get("div.microcart button.close").click();
    cy.get(".minicart-count").should("contain", "2");
  });
});
