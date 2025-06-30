# 🧪 Playwright Smart Payment Automation

## Overview

This repository contains automated **end-to-end tests** using [Playwright](https://playwright.dev/) to validate **Smart Payment Options**.  
The first integration covered is **PayPal Checkout**.

---

## 📁 Project Structure
```bash
├── .github/workflows/         # GitHub Actions CI setup
│   └── smartpay-trigger-action.yml
├── fixtures/                  # Static test data for different environments
│   ├── brands-data-prod.json
│   └── brands-data-stag.json
├── pages/                     # Page Object Models (POM)
│   ├── landingPage.js
│   ├── optins-page.js
│   └── ...
├── support/                   # Shared utility commands
│   └── commands.js
├── tests/                     # Test specs organized by brand/module
│   ├── tny/
│   │   └── offer-page-tny-smart-pay.spec.js
│   └── vogue/
│       └── offer-page-vogue-smart-pay.spec.js
│   └── search-tshirt.spec.ts  # Example MCP-generated test
├── utils/                     # Common utilities (e.g., Chargebee helpers)
│   └── chargebee-utils.js
├── playwright.config.js       # Playwright test runner configuration
├── package.json
├── testContexts/              # MCP context and scenario files
│   └── webtestcontext.txt
└── README.md
```
---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/smart-payment-playwright.git
npm install
```
### 2. Running Tests

```bash 
npx playwright test
```
To Run specific test
```bash
npx playwright test ./offer-page-tny-smart-pay.spec.js
```
To Run test in UI mode
```bash
npx playwright test --ui
```

### 3. View Tests Reports 
```bash
npx playwright show-report
```
### Environment Variables 

Following Environment Vars should be set before running the tests

- `CHARGEBEE_SECRET_KEY_STAG` - Auth Key of Chargebee's API

### CI Integration (GitHub Actions)

The CI workflow file is located in `.github/workflows/smartpay-trigger-action.yml`

It automatically:
- Installs dependencies
- Runs tests (optionally sharded or brand-scoped)
- Uploads Playwright report/artifacts
- Comments workflow URL on downstream PRs (if configured)
 
To trigger a test workflow manually from another repo:
- Use the composite GitHub Action (`smartpay-trigger-action.yml`) and pass appropriate inputs for environment, token, branch, and workflow.
---

# 🧠 Playwright MCP Test Generation

This project also demonstrates how to create and execute automated test cases using Playwright with the Model Context Protocol (MCP) approach.

## How to Configure Playwright MCP from Scratch

1. **Install Playwright**
   ```bash
   npm install --save-dev @playwright/test
   npx playwright install
   ```
2. **Install Playwright MCP Server**
   ```bash
   npm install -g @executeautomation/playwright-mcp-server
   ```
3. **Set Up Project Structure**
   - Create the following folders if they do not exist:
     - `tests/` — for test files
     - `testContexts/` — for MCP context and scenario files
   - Add a Playwright config file (e.g., `playwright.config.js`).

4. **Add MCP Context File**
   - Create `testContexts/webtestcontext.txt` with content like:
     ```plaintext
     You are a playwright test generator.
     You are given a scenario and you need to generate a playwright test for it.
     DO NOT generate test code based on the scenarios alone.
     DO run steps one by one using the tools provided by the playwright MCP
     Only after all steps are completed, emit a Playwright Typescript test that uses @playwright/test based on message history
     Save generated test file in the tests directory.
     Execute the test file and iterate until the test passes.
     ```

5. **Write a Scenario**
   - Define your test scenario in plain language (e.g., in a prompt, doc, or issue).

6. **Run the MCP Agent**
   - Use your MCP agent or automation (such as GitHub Copilot or a custom script) to:
     - Read the scenario and context.
     - Interactively run each step in a real browser using Playwright MCP tools.
     - Generate a Playwright test file in TypeScript and save it in `tests/`.
     - Execute the test and iterate until it passes.

7. **Review and Maintain**
   - All generated tests are stored in the `tests/` directory for review and maintenance.

---

## How Test Cases Are Created Using Playwright MCP

1. **Scenario Definition**
   - Write a scenario describing the user journey or feature to test (e.g., search for a product and verify results).

2. **MCP-Driven Test Generation**
   - The MCP agent receives the scenario and:
     - Runs each step interactively in a real browser using Playwright MCP tools.
     - Only after all steps are validated, generates a Playwright test file in TypeScript using `@playwright/test`.
     - Saves the generated test in the `tests/` directory.

3. **Test Execution and Iteration**
   - The generated test is executed using Playwright CLI (`npx playwright test`).
   - If the test fails (e.g., due to strict mode or selector issues), the MCP agent iterates:
     - Updates the test code to resolve issues (e.g., by refining selectors or logic).
     - Re-runs the test until it passes.

4. **Example Test Case**

File: `tests/search-tshirt.spec.ts`
```typescript
import { test, expect } from '@playwright/test';

test('Search for T-Shirt and verify result', async ({ page }) => {
  await page.goto('http://www.automationpractice.pl/index.php');
  await page.getByRole('textbox', { name: 'Search' }).fill('T-Shirt');
  await page.getByRole('textbox', { name: 'Search' }).press('Enter');
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
```

## Steps to Reproduce / Add New Tests

1. **Define a scenario** in plain language (e.g., in an issue, doc, or prompt).
2. **Let the MCP agent**:
   - Run each step in the browser.
   - Generate and save the Playwright test file.
   - Execute and iterate until the test passes.
3. **Review and maintain** the generated test in the `tests/` directory.

## Notes

- The MCP approach ensures tests are based on real, validated browser actions, reducing flaky tests.
- All test code is TypeScript and uses the `@playwright/test` runner.
- For more details, see `testContexts/webtestcontext.txt`.

---

# 🧠 Playwright MCP API Test Generation

This section documents how to generate and execute API tests using Playwright and the Model Context Protocol (MCP) approach.

## How to Generate API Tests with Playwright MCP

1. **Define the API Test Scenario**
   - Clearly describe the API endpoint, HTTP method, and validation requirements (e.g., status code, response keys, schema, and logging).
   - Example scenario:
     - Endpoint: `https://fakestoreapi.com/products`
     - Method: GET
     - Validate: status 200, keys `id`, `title`, `price`, `category`, `description`, and log product title and price.

2. **Set Up MCP API Test Context**
   - Create a context file (e.g., `testContexts/apitestcontext.txt`) with instructions for API test generation, such as:
     ```plaintext
     You are an API test generator using Playwright MCP
     Use Playwright's `request` context and `@playwright/test` framework.
     The test should:
      - Send HTTP requests to the target API.
      - Validate the status code, response body, and schema (if applicable)
      - Use async/await syntax.
      - Export the test to a `.spec.js` file under the `/tests` folder.
      - Print useful logs for debugging.
     Do not generate test code until all steps are fully explored and validated
     ```

3. **Generate the Playwright API Test**
   - Use the MCP agent to:
     - Read the scenario and context.
     - Interactively run each step (e.g., send request, check response, validate schema).
     - Only after all steps are validated, generate a Playwright test file (JavaScript or TypeScript) using `@playwright/test`.
     - Save the generated test in the `tests/` directory (e.g., `tests/fakestoreapi-products.spec.js`).

4. **Example Generated API Test**

   File: `tests/fakestoreapi-products.spec.js`
   ```javascript
   const { test, expect } = require('@playwright/test');

   // Optional: JSON schema for product validation
   const productSchema = {
     type: 'object',
     required: ['id', 'title', 'price', 'category', 'description'],
     properties: {
       id: { type: ['integer', 'number'] },
       title: { type: 'string' },
       price: { type: ['number', 'integer'] },
       category: { type: 'string' },
       description: { type: 'string' },
     },
   };

   function validateProductSchema(product) {
     for (const key of productSchema.required) {
       if (!(key in product)) {
         return `Missing key: ${key}`;
       }
       const expectedType = productSchema.properties[key].type;
       const actualType = typeof product[key];
       if (Array.isArray(expectedType)) {
         if (!expectedType.includes(actualType)) {
           return `Key '${key}' has type '${actualType}', expected one of ${expectedType}`;
         }
       } else if (actualType !== expectedType) {
         return `Key '${key}' has type '${actualType}', expected '${expectedType}'`;
       }
     }
     return null;
   }

   test('GET /products/1 returns a valid product object', async ({ request }) => {
     const url = 'https://fakestoreapi.com/products/1';
     console.log(`Sending GET request to: ${url}`);
     const response = await request.get(url);
     expect(response.status(), 'Status code should be 200').toBe(200);

     const product = await response.json();
     expect(typeof product, 'Response should be an object').toBe('object');
     // Validate required keys
     for (const key of productSchema.required) {
       expect(product, `Product should have key: ${key}`).toHaveProperty(key);
     }
     // Optional: Validate types
     const schemaError = validateProductSchema(product);
     expect(schemaError, schemaError || 'Product schema valid').toBeNull();
     // Log title and price
     console.log(`Product: ${product.title} | Price: $${product.price}`);
   });
   ```

5. **Run and Iterate**
   - Execute the test using Playwright CLI:
     ```bash
     npx playwright test tests/fakestoreapi-products.spec.js
     ```
   - If the test fails (e.g., due to response structure), update the test code and re-run until it passes.

6. **Review and Maintain**
   - All generated API tests are stored in the `tests/` directory for review and maintenance.

---

*API test generation and execution is automated and validated using Playwright MCP workflows. For more details, see `testContexts/apitestcontext.txt`.*

---

*Generated and maintained using Playwright MCP automation.*
