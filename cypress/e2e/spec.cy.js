describe("Login", () => {
  it('clicks the link "type"', () => {
    cy.visit("https://momentum-mentors.netlify.app/");
    cy.contains("Log in").click();
    cy.url().should("include", "/login");
    cy.get('input[username="username"]').type("test");
    cy.contains("Login").click();


  });
});
