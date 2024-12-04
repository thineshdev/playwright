import { test,chromium, expect } from '@playwright/test';

test('test', async () => {
  const browser = await chromium.launch({
    channel: 'chrome', // Use Google Chrome
    headless: false, // Show browser GUI
  });

  // Create a new context with video recording enabled
  const context = await browser.newContext({
    recordVideo: { dir: 'videos/' }, // Directory to save recorded videos
  });

  // Create a new page in the context
  const page = await context.newPage();

  await page.goto('https://cafe4x.com/home');
  await page.locator('div').filter({ hasText: /^Login$/ }).nth(1).click();
  await page.getByRole('textbox', { name: 'Enter UserName' }).click();
  await page.getByRole('textbox', { name: 'Enter UserName' }).fill('Lohith');
  await page.getByRole('textbox', { name: 'Enter Password' }).click();
  await page.getByRole('textbox', { name: 'Enter Password' }).fill('4110');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: '﨡 Users' }).click();
  await page.getByText('Lohithlohith@gmail.').first().click();
  await page.locator('img').nth(1).click();
  await page.getByText('Signout').click();
  
  await page.waitForTimeout(5000); // Wait for 5 seconds for demo purposes

  // Close context to finalize video
  await context.close();

  // Close the browser
  await browser.close();
});