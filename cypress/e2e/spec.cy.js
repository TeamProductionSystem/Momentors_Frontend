describe("Login", () => {
  it('clicks the link "type"', () => {
    cy.visit("https://momentum-mentors.netlify.app/");
    cy.contains("Log in").click();
    cy.url().should("include", "/login");



  });
});
