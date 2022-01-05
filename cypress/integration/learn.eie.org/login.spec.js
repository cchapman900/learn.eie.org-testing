/// <reference types="cypress" />

context('logged in', () => {
  before(() => {
    cy.visit('https://learn.eie.org')
  })

  it('shows the login screen', () => {
    cy.get('[formcontrolname=username]').should('be.visible')
  })

  it('can log in', {
    defaultCommandTimeout: 60000
  }, () => {
    const username = Cypress.env('username');
    const password = Cypress.env('password');

    cy.get('[formcontrolname=username]').type(username)
    cy.get('[formcontrolname=password]').type(password)

    cy.contains('Log In').click()

    if (cy.get('.swal2-actions', {timeout: 5000})){
      cy.get('.swal2-actions').contains('Continue').click()
    }

    cy.get('h3').contains('Free Content').should('be.visible');

  })

  // describe('course content', () => {
  //   it('can open the MagLev unit', () => {
  //     cy.visit('https://learn.eie.org/lmsplayer/unit/zbdn5d7bd19a434fbad5b48a89b020f5', {failOnStatusCode: false})
  //     cy.get('p').contains('Designing Maglev Systems').should('be.visible')
  //   })
  // })
})
