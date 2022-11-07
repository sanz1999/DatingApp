/// <reference types="cypress" />

describe('empty spec', () => {
  it('passes', () => {
    cy.visit('https://localhost:4200/')

    cy.get('[data-test="username"]').type("sofia")
    cy.get('[data-test="password"]').type("Amida2203")
    cy.get('[data-test="registerButton"]').click()

    cy.get('[href="/messages"]').click()

    cy.url().should('eq','https://localhost:4200/messages')
  })
})