describe("product page", () => {
  it("verify that all informations are visible", () => {
    cy.visit("/p/WS01/gwyn-endurance-tee-1577/WS01");
    cy.url().should("include", "/p/WS01/gwyn-endurance-tee-1577/WS01");
    indexedDB.deleteDatabase("shop");
    cy.clearLocalStorage();
    cy.get("h1").should("contain", "Gwyn Endurance Tee");

    cy.get(":nth-child(1) > .bg-cl-secondary > .product-image").should(
      "have.attr",
      "src",
      "https://demo.vuestorefront.io/img/600/744/resize/w/s/ws01-black_main.jpg"
    );

    cy.get(".color[aria-label='Select color Green']").click();
    cy.get(":nth-child(1) > .variants-label > .weight-700").should(
      "contain",
      "Green"
    );
    cy.get('[aria-label="Select color Yellow"]')
      .click()
      .should("have.class", "active");
    cy.get(".VueCarousel-navigation-prev > .material-icons").dblclick();
    cy.get(":nth-child(4) > .bg-cl-secondary > .product-image").should(
      "be.visible"
    );
    cy.get("[aria-label='Select size M']")
      .click()
      .should("have.class", "active");
    cy.get(":nth-child(2) > .variants-label > .weight-700").should(
      "contain",
      "M"
    );
    cy.get('[aria-label="Select size L"]')
      .click()
      .should("have.class", "active");
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
    cy.get(".py40 > :nth-child(2) > .p0").click();
    cy.get("[data-testid=notificationMessage]").should(
      "contain",
      "Product Gwyn Endurance Tee has been added to the compare!"
    );
    cy.get(".py40 > :nth-child(2) > .p0").click();
    cy.get("[data-testid=notificationMessage]").should(
      "contain",
      "Product Gwyn Endurance Tee has been removed from compare!"
    );
  });
});
