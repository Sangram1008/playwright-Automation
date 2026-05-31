// Import Playwright configuration helper
import { defineConfig } from '@playwright/test';

// Import dotenv package to read values from .env file
import * as dotenv from 'dotenv';

// Load all environment variables from .env into process.env
dotenv.config();

// Read TEST_ENV from .env
// If TEST_ENV is not defined, default to 'local'
const environment = process.env.TEST_ENV || 'local';

// Determine which URL to use based on the environment
// If TEST_ENV=qa -> use QA_URL
// Otherwise -> use LOCAL_URL
const baseURL =
	environment === 'qa'
		? process.env.QA_URL
		: process.env.LOCAL_URL;

// Print the selected environment and URL in the console
// Useful for debugging and confirming which environment is running
console.log(
	`Running tests in ${environment} environment with base URL: ${baseURL}`
);

// Export Playwright configuration
export default defineConfig({

	// Common settings used by all tests
	use: {

		// Base URL used by page.goto('/')
		// Example:
		// page.goto('/')
		// becomes:
		// http://localhost:4200/ (local)
		// or
		// https://qa.company.com/ (qa)
		baseURL: baseURL,

		// Launch browser in headed mode
		// false = browser visible
		// true = browser hidden (headless mode)
		headless: false,
	},

	// Maximum execution time allowed per test
	// 90 seconds
	timeout: 90000,

	// Timeout for all Playwright expect assertions
	// Example:
	// await expect(locator).toBeVisible();
	expect: {
		timeout: 90000,
	},

	// Run only one test worker at a time
	// Useful when tests share data or when debugging
	workers: 1,

	// Disable parallel execution within test files
	// Tests will execute sequentially
	fullyParallel: false,

	// Start Angular application only when running locally
	webServer:
		environment === 'local'
			? {
				// Command used to start Angular application
				command: 'ng serve',

				// Wait for application to become available on port 4200
				port: 4200,

				// Reuse existing Angular server if already running
				// Prevents starting multiple ng serve instances
				reuseExistingServer: true,

				// Maximum wait time for Angular server startup
				// 120 seconds
				timeout: 120000,
			}
			: undefined, // Skip ng serve for QA environment
});