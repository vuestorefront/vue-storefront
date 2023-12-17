const validateMetaTag = () =>
  cy
    .get("head meta[name=generator]")
    .should("have.attr", "content", "Vue Storefront 2");

describe("SDK Module Acceptance Criteria", () => {
  it("should have generator meta tag on ssr page", () => {
    cy.visit("/ssr");
    validateMetaTag();
  });

  it("should send cookies header on ssr page", () => {
    cy.setCookie("vsf-currency", "USD");
    cy.visit("/ssr");
    cy.get("main").should("contain.text", "vsf-currency=USD");
  });

  it("should have generator meta tag on csr page", () => {
    cy.visit("/csr");
    validateMetaTag();
  });
});
