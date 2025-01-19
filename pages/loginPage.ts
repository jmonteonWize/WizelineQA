import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private emailInput = 'input#element-0';
  private passwordInput = '//*[@id="element-2"]';
  private loginButton = 'button:has-text("Log in")';
  private todayHeaderMessage = 'text="Today"'
  private errorLengthMessage = 'Passwords must be at least 8 characters long.';
  private errorInvalidEmailFormatMessage = 'Please enter a valid email address';
  private errorInvalidEmailMessage = 'Wrong email or password.'
  constructor(page: Page) {
    this.page = page;
  }

  // Método para realizar el login
  async login(email: string, password: string) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  // Método para verificar si hay un error en el login
  async getLenghtErrorMessage() {
    return await this.page.getByText(this.errorLengthMessage);
  }

  async getInvalidEmailFormatErrorMessage() {
    return await this.page.getByText(this.errorInvalidEmailFormatMessage);
  }

  async getInvalidEmailErrorMessage() {
    return await this.page.getByText(this.errorInvalidEmailMessage);
  }

  async todayHeader() {
    const todayText = await this.page.locator('text="Today"').first();
    return await todayText.isVisible();
  }
}
