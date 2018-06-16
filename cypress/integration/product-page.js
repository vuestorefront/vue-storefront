describe("product page", () => {
  it("verify that all informations are visible", () => {
    cy.visit("/p/WS01/gwyn-endurance-tee-1577/WS01");
    indexedDB.deleteDatabase("shop");
    cy.clearLocalStorage();
    cy.get("h1").should("contain", "Gwyn Endurance Tee");
    cy.get(".color[aria-label='Select color Green']").click();
    cy.get(":nth-child(1) > .variants-label > .weight-700").should(
      "contain",
      "Green"
    );
    cy.get("[aria-label='Select size M']").click();
    cy.get(":nth-child(2) > .variants-label > .weight-700").should(
      "contain",
      "M"
    );
    cy.get(".py40 > :nth-child(1) > .p0").click();
    cy.get("[data-testid=notificationMessage]").should(
      "contain",
      "Product Gwyn Endurance Tee has been added to wishlist!"
    );
    cy.get(".py40 > :nth-child(1) > .p0").click();
    cy.get("[data-testid=notificationMessage]").should(
      "contain",
      "Product Gwyn Endurance Tee has been removed from wishlist!"
    );
  });
});
