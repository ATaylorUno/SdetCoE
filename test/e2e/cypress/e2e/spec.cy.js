import login from "../pageobjects/login";

describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/logIn");
    const loginPage = new login();
    loginPage.elements.loginButton().first().screenshot("button test");
    loginPage.enterEmail("test@gmail.com");
    loginPage.enterPassword("test123");
    loginPage.clickLogin();

    cy.url().should("eq", "http://localhost:5173/");
    cy.screenshot();
  });
});
