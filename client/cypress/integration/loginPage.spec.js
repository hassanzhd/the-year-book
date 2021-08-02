describe("Login form testing", () => {
  it("should be able to successfully submit form (e2e)", () => {
    cy.visit("http://localhost:3000/");

    cy.get("input#email")
      .type("foobar@email.com")
      .should("have.value", "foobar@email.com");

    cy.get("input#password")
      .type("foobarfoobar")
      .should("have.value", "foobarfoobar");

    cy.get("#loginButton").click();
  });
});
