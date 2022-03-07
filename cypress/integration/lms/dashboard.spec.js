/// <reference types="cypress" />

context('on the dashboard', {
    // Default timeout of 30 seconds
    defaultCommandTimeout: 30000
  }, () => {
  before(() => {
    cy.login()
  })

  it('shows "Recently Viewed" section', () => {
    cy.get('h3').contains('Recently Viewed').should('be.visible');
  })

  it('shows "My Favorites" section', () => {
    cy.get('h3').contains('My Favorites').should('be.visible');
  })

  it('shows "My Library" section', () => {
    cy.get('h3').contains('My Library').should('be.visible');
  })

  it('shows "Free Content" section', () => {
    cy.get('h3').contains('Free Content').should('be.visible');
  })
  
  it('shows "My Recommendations" section', () => {
    cy.get('h3').contains('My Recommendations').should('be.visible');
  })
  
  it('shows "Explore" section', () => {
    cy.get('h3').contains('Explore').should('be.visible');
  })

})