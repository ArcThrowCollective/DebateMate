describe('E2E thumb buttons', () => {
  it('Renders the thumbs up button', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-testid="btn__thumbs-up"]').should('exist');
  });
});
