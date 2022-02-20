it('Home', () => {
    cy.visit('/');

    cy.contains('Service hotline');
})
