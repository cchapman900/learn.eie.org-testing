/// <reference types="cypress" />

describe('log in to dashboard', () => {

    before(() => {
      cy.visit('https://learn.eie.org')
    })

    it('shows the login screen'), () => {
      cy.get('formcontrolname=username').should('be.visible')
    }
  
    it('can log in', {
      defaultCommandTimeout: 60000
    }, () => {
      const username = Cypress.env('username');
      const password = Cypress.env('password');
  
      cy.get('[formcontrolname=username]').type(username)
      cy.get('[formcontrolname=password]').type(password)
  
      cy.contains('Log In').click()

      if (cy.get('.swal2-actions')){
        cy.get('.swal2-actions').contains('Continue').click()
      }
  
      cy.get('h3').contains('Free Content').should('be.visible');
    })
  
    it('can see My Library', () => {
      cy.get('h3').contains('My Library').should('be.visible')
      // cy.get('h3').contains('My Library').siblings('.seeAll').click()
    })
})
