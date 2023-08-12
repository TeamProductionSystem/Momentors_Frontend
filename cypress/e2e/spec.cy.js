describe("Home Page Test", () => {
  it('clicks the link "type"', () => {
    cy.visit("localhost:3000");
    cy.get("[data-cy='hero-message']").contains(
      "Find a mentor to help achieve your goals and a Master you will become..."
    );
    cy.get("[data-cy='beta-warning-message']").contains(
      "** As we continue to refine our Beta version, we recommend using Google Chrome for the best experience. Please also allow for extra time, as server response may be slower than usual during this period. We appreciate your patience and understanding. Improved cross-platform compatibility and performance enhancements are on the way! **"
    );
  });
});
