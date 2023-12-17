describe("SDK Module Acceptance Criteria", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should have meta tag on ssr rendered page", () => {
    cy.get("head meta[name=generator]").should(
      "have.attr",
      "content",
      "vue storefront 2"
    );
  });
});
