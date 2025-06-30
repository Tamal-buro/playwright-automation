import { test, expect } from '@playwright/test';

test('Search for T-Shirt and verify result', async ({ page }) => {
  // Step 1: Navigate to the homepage
  await page.goto('http://www.automationpractice.pl/index.php');

  // Step 2: Search for 'T-Shirt'
  await page.getByRole('textbox', { name: 'Search' }).fill('T-Shirt');
  await page.getByRole('textbox', { name: 'Search' }).press('Enter');

  // Step 3: Verify the product in the list (pick the first visible matching link)
  const links = await page.locator('a', { hasText: /Faded Short Sleeve T-shirts/i }).all();
  let found = false;
  for (const link of links) {
    if (await link.isVisible()) {
      found = true;
      break;
    }
  }
  expect(found).toBeTruthy();
});
