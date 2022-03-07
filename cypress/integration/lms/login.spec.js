/// <reference types="cypress" />

describe('Loggin in', () => {
  context('Unauthorized', () => {
    // we must have a valid session cookie to be logged
    it('is redirected on visit to /dashboard when no session', function () {

      cy.visit('/dashboard', {failOnStatusCode: false})
      cy.get('[formcontrolname=username]').should('be.visible')

      cy.url().should('include', 'login-form')
    })
  })

  context('filling out login form', {
    // Default timeout of 30 seconds
    defaultCommandTimeout: 30000
  }, () => {
    before(() => {
      cy.visit('/')
    })

    it('shows the login screen', () => {
      cy.get('[formcontrolname=username]').should('be.visible')
    })

    it('requires valid credentials', () => {
      cy.get('[formcontrolname=username]').type('wrongUsername')
      cy.get('[formcontrolname=password]').type('wrongPassword')
      cy.contains('Log In').click()

      cy.get('.alertText').contains('Username or Password is incorrect.').should('be.visible')
    })

    it('can log in', () => {
      const username = Cypress.env('username');
      const password = Cypress.env('password');

      cy.get('[formcontrolname=username]').clear().type(username)
      cy.get('[formcontrolname=password]').clear().type(password)
      cy.get('#remember_me').check()

      cy.contains('Log In').click()

      // Give a moment for the "too many logins" popup to appear
      cy.wait(1000)

      // Check to see if the "too many logins" popup appears
      cy.get('body').then((body) => {
        if (body.find('.swal2-actions').length > 0) {
          // If it did appear, click it
          cy.get('.swal2-actions').contains('Continue').click()
        }
      })

      cy.get('h3').contains('Free Content').should('be.visible');

      // cy.get('[aria-label="My Account"]').click()
      // cy.get('[aria-label="LogOut"]').click();
    })

    // it('can log out', () => {
    //   cy.get('[aria-label="My Account"]').click()
    //   cy.get('[aria-label="LogOut"]').contains('Logout').click();
    // }) 

  })
  
})

