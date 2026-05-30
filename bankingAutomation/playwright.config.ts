import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';


dotenv.config();

const environment = process.env.TEST_ENV || 'local';

const baseURL = environment === 'qa' ? process.env.QA_URL : process.env.LOCAL_URL;

export default defineConfig({
	use: {
		baseURL: baseURL,
		headless: false,
	},

	timeout: 90000, //  90 seconds per test timeout

	expect: {
		timeout: 90000, // 90 seconds for all expect() assertions
	},

	webServer: {
		command: 'ng serve',
		port: 4200,
		reuseExistingServer: true,
		timeout: 120000,
	},
});