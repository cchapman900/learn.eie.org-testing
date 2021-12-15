/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('https://learn.eie.org')
  })

  it('can log in', () => {
    cy.get('[formcontrolname=username]').type('test')
  })
})
