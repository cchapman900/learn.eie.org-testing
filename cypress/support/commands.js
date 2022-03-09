// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', () => {
  cy.visit('/login-form', {failOnStatusCode: false})

  const username = Cypress.env('username');
  const password = Cypress.env('password');
  Cypress.log({
    name: 'loginByForm',
    message: `${username} | ${password}`,
  })

  cy.get('[formcontrolname=username]').clear().type(username)
  cy.get('[formcontrolname=password]').clear().type(password)
  cy.get('#remember_me').check()

  cy.contains('Log In').click()

  // Give a moment for the "too many logins" popup to appear
  cy.wait(2000)

  // Check to see if the "too many logins" popup appears
  cy.get('body').then((body) => {
    if (body.find('.swal2-actions').length > 0) {
      // If it did appear, click it
      cy.get('.swal2-actions').contains('Continue').click()
    }
  })

  cy.url().should('contain', 'dashboard')
})

const clear = Cypress.LocalStorage.clear

// Disable clearing local storage
Cypress.LocalStorage.clear = () => { }

// Temp: Try to make this work - CC
// Cypress.Commands.overwrite('clearLocalStorage', (shouldClear=false) => {
//   if (shouldClear) {
//     localStorage.clear();
//   }
// })

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
