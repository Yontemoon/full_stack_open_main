describe('Blog app', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    //this creates a user and saves it in MongoDB Atlas
    const user = {
      name: "Monte Yoon",
      username: "MonteYoon",
      password: "Water123"
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('5.17: Login form is shown', function() {
    cy.contains('Log in to Application...')
  })

  describe("Logging in", function() {
    it('5.18: succeeds with correct credentials', function() {
      cy.get('#inputUsername').type('MonteYoon')
      cy.get('#inputPassword').type('Water123')
      cy.get('#buttonLogin').click()
      cy.contains("Monte Yoon is logged in.")
    })

    it("5.18: succeeds with wrong credentials", function() {
      cy.get('#inputUsername').type('MonteYoon')
      cy.get('#inputPassword').type('Water124')
      cy.get('#buttonLogin').click()
      cy.contains("Wrong credentials")
    })
  })

  describe("5.19: When logged in", function () {
    beforeEach(function() {
      cy.get('#inputUsername').type('MonteYoon')
      cy.get('#inputPassword').type('Water123')
      cy.get('#buttonLogin').click()
      cy.get('#buttonVisible').click();
      cy.get('#inputBlogTitle').type('Cypress blog title')
      cy.get('#inputBlogAuthor').type('Monte Yoon')
      cy.get('#inputBlogUrl').type('www.cypress.com')
      cy.get('#submitBlog').click()
    })

    it('Can create a new blog', function() {
      cy.contains('Cypress blog title || Monte Yoon')
    })

    it('5.20: Can add an additional like to the blogpost', function() {
      cy.get('.buttonView').click()
      cy.get('.buttonLike').click()
      cy.get('.likesNumber').contains("1")
    })
  })

})