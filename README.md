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
├── utils/                     # Common utilities (e.g., Chargebee helpers)
│   └── chargebee-utils.js
├── playwright.config.js       # Playwright test runner configuration
├── package.json
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
