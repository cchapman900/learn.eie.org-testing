/// <reference types="cypress" />

context('on the dashboard', {
    // Default timeout of 30 seconds
    defaultCommandTimeout: 30000
  }, () => {
  before(() => {
    cy.visit('https://learn.eie.org/dashboard;from=mydashboard')
  })

  it('shows the dashboard content', () => {
    cy.get('[formcontrolname=username]').should('be.visible')
  })

})