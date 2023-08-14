describe("Home Page Test", () => {
  it('clicks the link "type"', () => {
    // Go to the home page
    cy.visit("localhost:3000");
    // Confirm the Nav Bar Title is present and correct
    cy.getByData("Nav-Title").contains("Momentum Mentors");
    // Check the Hero text is present and correct
    cy.getByData("hero-message").contains(
      "Find a mentor to help achieve your goals and a Master you will become..."
    );
    // Confirm the image is present
    cy.getByData("hero-image").should("have.attr", "src");

    // Confirm the Beta message is presentand correct
    cy.getByData("hero-beta-warning-message").contains(
      "** As we continue to refine our Beta version, we recommend using Google Chrome for the best experience. Please also allow for extra time, as server response may be slower than usual during this period. We appreciate your patience and understanding. Improved cross-platform compatibility and performance enhancements are on the way! **"
    );
    // Confirm the login button is present and working properly
    cy.getByData("hero-login-button").should(($btn) => {
      const text = $btn.text();
      expect(["Sign In", "🙌"]).to.include(text);
    });
    cy.getByData("hero-login-button").trigger("mouseout").contains("Sign In");
    cy.getByData("hero-login-button").click();

    // Confirm the register button is present and working properly
    cy.visit("localhost:3000");
    cy.getByData("hero-register-button").should(($btn) => {
      const text = $btn.text();
      expect(["Register", "🫶"]).to.include(text);
    });
    cy.getByData("hero-register-button")
      .trigger("mouseout")
      .contains("Register");
    cy.getByData("hero-register-button").click();
    cy.visit("localhost:3000");
  });
});
