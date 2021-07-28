describe("Register form testing", () => {
  it("should be able to successfully move from step 1 to step2", () => {
    cy.visit("http://localhost:3000/register");

    cy.get("input#email")
      .type("foobar@email")
      .should("have.value", "foobar@email");

    cy.get("input#password")
      .type("foobarfoobar")
      .should("have.value", "foobarfoobar");

    cy.get("#nextButton").click();
  });

  it("should be able to successfully move from step 1 to step2 to vice versa", () => {
    cy.visit("http://localhost:3000/register");

    cy.get("input#email")
      .type("foobar@email")
      .should("have.value", "foobar@email");

    cy.get("input#password")
      .type("foobarfoobar")
      .should("have.value", "foobarfoobar");

    cy.get("#nextButton").click();
    cy.get("#previousButton").click();
  });

  it("should be able to successfully submit form (e2e)", () => {
    cy.visit("http://localhost:3000/register");

    cy.get("input#email")
      .type("foobar@email.com")
      .should("have.value", "foobar@email.com");

    cy.get("input#password")
      .type("foobarfoobar")
      .should("have.value", "foobarfoobar");

    cy.get("#nextButton").click();

    cy.get("input#handle").type("foobarfoo").should("have.value", "foobarfoo");
    cy.get("input#fullName")
      .type("IAMFOOBAR")
      .should("have.value", "IAMFOOBAR");
    cy.get("input#university")
      .type("foobar university")
      .should("have.value", "foobar university");
    cy.get("input#batch").type("18").should("have.value", "2018");
    cy.get("textarea#shortBio")
      .type("i am too lazy")
      .should("have.value", "i am too lazy");
  });
});
