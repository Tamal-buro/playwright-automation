# 🧪 Playwright Smart Payment Automation

## Overview

This repository contains automated **end-to-end tests** using [Playwright](https://playwright.dev/) to validate **Smart Payment Options**.  
The first integration covered is **PayPal Checkout**.

---

## 📁 Project Structure

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

---
