# Environment Configuration

## Overview

This project supports execution against multiple environments (Local, QA, UAT, and Production) using environment variables.

Environment-specific values such as application URLs are stored in the `.env` file and loaded using the `dotenv` package.

---

## Prerequisites

Install the required packages:

### dotenv

```bash
npm install dotenv --save-dev
```

**Purpose:**

Loads environment variables from a `.env` file into the application at runtime.

**Benefits:**

* Avoids hardcoding URLs and credentials in code.
* Supports multiple environments (Local, QA, UAT, Production).
* Makes configuration management easier and more secure.

**Example:**

```env
LOCAL_URL=http://localhost:4200
QA_URL=https://qa.application.com
```

### cross-env

```bash
npm install cross-env --save-dev
```

**Purpose:**

Allows environment variables to be set in npm scripts in a way that works consistently across Windows, Linux, and macOS.

**Benefits:**

* Enables execution against different environments without changing code.
* Ensures compatibility across developer machines and CI/CD pipelines.

**Example:**

```json
{
  "scripts": {
    "test:local": "cross-env TEST_ENV=local playwright test",
    "test:qa": "cross-env TEST_ENV=qa playwright test"
  }
}
```

---

## Environment File

Create a `.env` file in the project root directory.

**Example:**

```env
LOCAL_URL=http://localhost:4200
QA_URL=https://qa.application.com
UAT_URL=https://uat.application.com
PROD_URL=https://application.com
```

---

## Playwright Configuration

The Playwright configuration reads the environment and selects the appropriate URL.

```typescript
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.TEST_ENV || 'local';

const baseURL =
  env === 'qa'
    ? process.env.QA_URL
    : process.env.LOCAL_URL;

export default defineConfig({
  use: {
    baseURL,
    headless: false,
  },
});
```

---

## Package Scripts

Add the following scripts to `package.json`:

```json
{
  "scripts": {
    "test:local": "cross-env TEST_ENV=local playwright test",
    "test:qa": "cross-env TEST_ENV=qa playwright test"
  }
}
```

---

## Running Tests

### Execute Against Local

```bash
npm run test:local
```

### Execute Against QA

```bash
npm run test:qa
```

---

## Best Practices

* Do not hardcode URLs in test scripts.
* Use environment variables for all environment-specific configurations.
* Keep credentials, API keys, and secrets outside source code.
* Store sensitive information in secure secret management tools or CI/CD variables.
* Add `.env` files to `.gitignore` when they contain confidential information.

**Example `.gitignore`:**

```text
.env
.env.local
.env.qa
.env.uat
.env.prod
```
