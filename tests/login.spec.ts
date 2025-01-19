import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { config } from '../config/config';

test.describe('Tests successful login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto(config.baseUrl);  // Usa la URL base configurada en .env
  });

  test('should login successfully', async () => {
    await loginPage.login(config.email, config.password);
    await loginPage.todayHeader();
});

  test('should fail login with incorrect email format', async () => {
    await loginPage.login('invalid@t', 'wrongpassword');
    const errorMessageLocator = await loginPage.getInvalidEmailErrorMessage();
    const errorMessageText = await errorMessageLocator.textContent();
    await expect(errorMessageText?.trim()).toBe('Please enter a valid email address.');
});
  test('should fail login with password as blank', async () => {
    await loginPage.login('invalid@test.com', '');
    const errorMessageLocator = await loginPage.getLenghtErrorMessage();
    const errorMessageText = await errorMessageLocator.textContent();
    await expect(errorMessageText?.trim()).toBe('Passwords must be at least 8 characters long.');
    
  });
  test('should fail login with incorrect email address', async () => {
    await loginPage.login('tesrt@test.com', 'wrongpassword');
    const errorMessageLocator = await loginPage.getInvalidEmailErrorMessage();
    const errorMessageText = await errorMessageLocator.textContent();
    await expect(errorMessageText?.trim()).toBe('Wrong email or password.');
});

});

