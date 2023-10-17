class login {
  elements = {
    emailInput: () => cy.get('input[data-testid="email"]'),
    passwordInput: () => cy.get('input[data-testid="password"]'),
    loginButton: () => cy.get('button[data-testid="login-button"]')
  };
  enterEmail(email) {
    this.elements.emailInput().clear();
    this.elements.emailInput().type(email);
  }
  enterPassword(password) {
    this.elements.passwordInput().clear();
    this.elements.passwordInput().type(password);
  }

  clickLogin() {
    this.elements.loginButton().click();
  }
}

export default login;
