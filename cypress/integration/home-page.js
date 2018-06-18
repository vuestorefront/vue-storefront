describe("home page", () => {
  it("verify the content of the homepage", () => {
    cy.visit("/");
    cy.get(".modal-close").click();
    indexedDB.deleteDatabase("shop");
    cy.clearLocalStorage();
    cy.get(".VueCarousel-inner .VueCarousel-slide:first-of-type h1").should(
      "contain",
      "Luma Yoga"
    );
    cy.get(".VueCarousel-dot-container li:nth-of-type(2)").click();
    cy.get(".VueCarousel-inner .VueCarousel-slide:nth-of-type(2) h1").should(
      "contain",
      "Luma Fitness"
    );
    cy.get(".VueCarousel-dot-container li:nth-of-type(3)").click();
    cy.get(
      ".VueCarousel-inner .VueCarousel-slide:nth-of-type(3) .subtitle"
    ).should("contain", "What's new");
    cy.get(".newsletter-button > .button-outline")
      .click()
      .should("contain", "Subscribe");
    cy.get("p.h4").should(
      "contain",
      "Sign up to our newsletter and receive a coupon for 10% off!"
    );
    cy.get(".modal-close").click();
    cy.get(".new-collection").should("be.visible");
  });
});
