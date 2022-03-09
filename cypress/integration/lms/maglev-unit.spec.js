/// <reference types="cypress" />

describe('Loggin in', () => {
  context('on first accessing the dashboard', {
    // Default timeout of 30 seconds
    defaultCommandTimeout: 30000
  }, () => {

    before(() => {
      cy.login()
    })

    it('Can click into the Maglev unit', () => {
      const favorites = cy.get('[title="Designing Maglev Systems"]').parent().siblings('.imageDiv').first().click();
      cy.url().should('contain', 'lmsplayer')
    })

    it('should have a dark gray background color', () => {
      getShadowPlayerDOM().find('.imscc-player').then(($playerContainer) => {
        expect($playerContainer).to.have.css('background-color', 'rgb(89, 89, 89)')
      })
    })

    it('hids the table of contents if currently showing', () => {
      getShadowPlayerDOM().then(($shadow) => {
        if ($shadow.find('[aria-label="close notes"]').length > 0) {
          getShadowPlayerDOM().find('[aria-label="close notes"]').click();
        }
      })
    })

    it('shows the table of contents', () => {
      getShadowPlayerDOM().find('[aria-label="click here to show menu"]').click();
      getShadowPlayerDOM().find('.tocHeading').should('be.visible');
    })

    it('opens the introduction to the unit', () => {
      getShadowTocDOM().find('[aria-label="Why Elementary Engineering?"]').click();
      cy.wait(2000)
      getIframeBody().find('p').contains('Why teach engineering').should('be.visible');
    })

    it('can get to the resources of the first lesson', () => {
      getShadowTocDOM().find('[aria-label="toggle Lesson 1"]').click();
      getShadowTocDOM().find('[aria-label=Objectives]').should('be.visible');
      getShadowTocDOM().find('[aria-label="toggle Lesson 1"]').parent().siblings().find('[aria-label=Resources]').click();
      cy.wait(2000)
      getIframeBody().find('h1').contains('Resources').should('be.visible');
    })

    it('can open a PDF', () => {
      getIframeBody().find('a').contains('English').first().invoke('attr', 'href').then((href) => {
        cy.request(href)
      });
      // cy.url().should('contain', 'lorforst-cdn.learn.eie.org')
    })
  })
})

const getShadowPlayerDOM = () => {
  return cy.get('lm-fcd-main').shadow();
}

const getShadowTocDOM = () => {
  return getShadowPlayerDOM().find('lm-imscc-toc-home').shadow();
}

const getIframeDocument = () => {
  return getShadowPlayerDOM()
  .find('lm-imscc-webcontent-home')
  .shadow()
  .find('iframe[title="web page"]')
  // Cypress yields jQuery element, which has the real
  // DOM element under property "0".
  // From the real DOM iframe element we can get
  // the "document" element, it is stored in "contentDocument" property
  // Cypress "its" command can access deep properties using dot notation
  // https://on.cypress.io/its
  .its('0.contentDocument').should('exist')
}

const getIframeBody = () => {
  // get the document
  return getIframeDocument()
  // automatically retries until body is loaded
  .its('body').should('not.be.undefined')
  // wraps "body" DOM element to allow
  // chaining more Cypress commands, like ".find(...)"
  .then(cy.wrap);
}