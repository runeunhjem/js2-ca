describe("login test", () => {
  it("User cannot submit with wrong email  credentials", () => {
    cy.visit("http://localhost:5501");
    cy.get("#loginEmail").type("ttest@gmail");
    cy.get("#login-button").click();
    cy.get("#invalid-login-email").should("be.visible");
    cy.wait(2000);
  });

  it("User cannot submit with wrong password, and is shown error message ", () => {
    cy.visit("http://localhost:5501");
    cy.get("#loginEmail").type("test@noroff.no");
    cy.get("#loginPassword").type("test123");
    cy.wait(1000);
    cy.get("#login-button").click();

    cy.get("#invalid-login-password").should("be.visible");
  });

  it("user is shown error message when trying to login with wrong password over 8 letters", () => {
    cy.visit("http://localhost:5501");
    cy.get("#loginEmail").type("test@noroff.no");
    cy.get("#loginPassword").type("test1232323");
    cy.wait(1000);
    cy.get("#login-button").click();

    cy.get(".error-message").should("exist");
  });
});
