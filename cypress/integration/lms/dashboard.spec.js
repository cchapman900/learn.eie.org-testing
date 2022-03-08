/// <reference types="cypress" />

describe('Loggin in', () => {
  context('on first accessing the dashboard', {
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

  context('see all "My Library"', {
      // Default timeout of 30 seconds
      defaultCommandTimeout: 30000
    }, () => {
    it('shows purchased units', () => {
      cy.get('h3').contains('My Library').siblings().contains('See All').click();
      cy.get('[title="Designing Maglev Systems"]').should('be.visible');
    })

    it('can go back to the dashboard', () => {
      cy.get('[alt="Back Button"]').click();
    })
  })
})