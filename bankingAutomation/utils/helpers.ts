import { Page, expect } from '@playwright/test';

export class Helper {

    static async click(page: Page, selector: string) {
        await page.click(selector);
    }

    static async enterText(page: Page, selector: string, text: string) {
        await page.locator(selector).fill(text);
    }

    static async getText(page: Page, selector: string) {
        const text = await page.locator(selector).innerText();
        return text;
    }

    static async getAllText(page: Page, selector: string): Promise<string[]> {
        return await page.locator(selector).allInnerTexts();
    }

    static async clickOnMenue(page: Page, selector: string, text: string) {
        const menu = page.locator(selector).filter({ hasText: text }).first();
        await menu.waitFor({ state: 'visible', timeout: 90000 });
        await menu.click();
    }

    static async clickOnSubMenu(page: Page, selector: string, text: string) {
        const subMenu = page.locator(selector).filter({ hasText: text }).first();
        await subMenu.waitFor({ state: 'visible', timeout: 90000 });
        await subMenu.click();
    }

    static async searchByTextInSearchBox(page: Page, selector: string, text: string) {
        const searchBox = page.locator(selector);
        await searchBox.waitFor({ state: 'visible' });
        await searchBox.fill(text);
    }
}