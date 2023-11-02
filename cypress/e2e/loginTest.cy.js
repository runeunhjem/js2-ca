describe("login test", () => {
  it("logs in, and let user access the profile page", () => {
    cy.visit("http://localhost:5501");
    cy.get("#loginEmail").type("tokle@noroff.no");
    cy.get("#loginPassword").type("fingern234");
    cy.get("#login-button").click();

    cy.wait(2000);

    cy.url().should("include", "/profile");
  });
});
