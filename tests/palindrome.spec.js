const { test, expect } = require('@playwright/test');

test('should check if a word is a palindrome', async ({ page }) => {
  // go to the local host if you wish to test this with playwright - note there are other test folders setup whichever you prefer
  await page.goto('http://localhost:3000'); // Make sure your server is running at this address
  
  // Fill in the form just like it says on the browser :)
  await page.fill('input[name="word"]', 'KAYAK');
  await page.click('button[type="submit"]');
  
  // Check if the result is correct it will tell you and give your past tried and fails also in a list
  const result = await page.locator('.result').innerText();
  expect(result).toContain('is a palindrome');
  
  // Check if the word is listed in the palindromes history will show uop in the true list
  const history = await page.locator('.history ul').innerText();
  expect(history).toContain('KAYAK');
});

test('should check if a sentence is a palindrome', async ({ page }) => {
  // does teh same as above but for sentences
  await page.goto('http://localhost:3000');
  
  // Select the sentence option, fill in the form, and submit :) enjoy!
  await page.click('input[value="sentence"]');
  await page.fill('input[name="word"]', 'A man, a plan, a canal, Panama');
  await page.click('button[type="submit"]');
  
  // This will check if the result is correct :)
  const result = await page.locator('.result').innerText();
  expect(result).toContain('is a palindrome');
  
  // This will check if the sentence is listed in your recent palindromes history
  const history = await page.locator('.history ul').innerText();
  expect(history).toContain('A man, a plan, a canal, Panama');
});
