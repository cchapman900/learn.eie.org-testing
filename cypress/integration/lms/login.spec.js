/// <reference types="cypress" />

describe('Loggin in', () => {
  context('Unauthorized', () => {
    // we must have a valid session cookie to be logged
    it('is redirected on visit to /dashboard when no session', function () {

      cy.visit('/dashboard', {failOnStatusCode: false})

      cy.url().should('include', 'login-form')
    })

    it('shows the login screen', () => {
      cy.get('[formcontrolname=username]').should('be.visible')
    })
  })

  context('filling out login form with bad credentials', () => {
    before(() => {
      cy.visit('/')
    })

    it('requires valid credentials', () => {
      cy.get('[formcontrolname=username]').type('wrongUsername')
      cy.get('[formcontrolname=password]').type('wrongPassword')
      cy.contains('Log In').click()

      cy.get('.alertText').contains('Username or Password is incorrect.').should('be.visible')
    })

  })

  context('filling out login form with good credentials', {
    // Default timeout of 30 seconds
    defaultCommandTimeout: 30000
  }, () => {
    before(() => {
      cy.login()
    })

    it('should proceed to the dashboard after login', () => {
      cy.url().should('include', '/dashboard')
    })
  })
  
})

