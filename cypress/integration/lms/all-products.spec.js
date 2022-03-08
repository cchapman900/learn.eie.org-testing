/// <reference types="cypress" />

describe('On the All Products page', () => {

  context('on the "All Products" section', {
    // Default timeout of 60 seconds
    defaultCommandTimeout: 60000
  }, () => {

    before(() => {
      cy.login()
    })

    beforeEach(() => {
      cy.get('[aria-label="All Products"').click()
    })

    it('shows the All Products page', () => {
      cy.get('h3').contains('Computer Science Essentials').should('be.visible');
    })

    it('can filter to get the Windmills unit', () => {
      cy.get('[aria-label="Discipline"]').should('not.be.visible');
      cy.get('[aria-label="Click Filter Button"]').click();

      // Select Discipline filter
      cy.get('[aria-label="Discipline"]').should('be.visible');
      cy.get('[aria-label="Discipline"]').click();
      cy.get('[role=option]').contains('Engineering').children().check()

      // Select Grade filter
      cy.get('[aria-label="Grade"]').should('be.visible');
      cy.get('[aria-label="Grade"]').click();
      cy.get('[role=option]').contains('3').children().check()

      // Select Setting filter
      cy.get('[aria-label="Setting"]').should('be.visible');
      cy.get('[aria-label="Setting"]').click();
      cy.get('[role=option]').contains('In-School').children().check()

      // Select Topics filter
      cy.get('[aria-label="Topics"]').should('be.visible');
      cy.get('[aria-label="Topics"]').click();
      cy.get('[role=option]').contains('Climate Change').children().check()

      // Select Duration filter
      cy.get('[aria-label="Duration"]').should('be.visible');
      cy.get('[aria-label="Duration"]').click();
      cy.get('[role=option]').contains('8-10 hours').children().check()

      cy.get('[aria-label="Apply Filter"').click()

      cy.get('.card-title').contains('Designing Windmills').should('be.visible')
    })

    it('will show when there are no results', () => {
      cy.get('[aria-label="Discipline"]').should('not.be.visible');
      cy.get('[aria-label="Click Filter Button"]').click();

      // Select Discipline filter
      cy.get('[aria-label="Discipline"]').should('be.visible');
      cy.get('[aria-label="Discipline"]').click();
      cy.get('#item-0').check()

      // Select Grade filter
      cy.get('[aria-label="Grade"]').should('be.visible');
      cy.get('[aria-label="Grade"]').click();
      cy.get('#item-0').check()

      // Select Setting filter
      cy.get('[aria-label="Setting"]').should('be.visible');
      cy.get('[aria-label="Setting"]').click();
      cy.get('#item-0').check()

      // Select Topics filter
      cy.get('[aria-label="Topics"]').should('be.visible');
      cy.get('[aria-label="Topics"]').click();
      cy.get('#item-0').check()

      // Select Duration filter
      cy.get('[aria-label="Duration"]').should('be.visible');
      cy.get('[aria-label="Duration"]').click();
      cy.get('#item-0').check()

      cy.get('[aria-label="Apply Filter"').click()

      cy.get('.totalcount').contains('No results were found').should('be.visible')

      cy.get('[alt="Back Button"]').click()
      cy.url().should('contain', '/dashboard;from=allproducts')
    })
  })
})