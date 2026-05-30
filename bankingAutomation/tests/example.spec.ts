import { test, expect } from '@playwright/test';
import { Helper } from '../utils/helpers';

test.describe('Application Tests', () => {

   test.beforeEach(async ({ page }) => {
      await page.goto('/');
   });


   test('in manage user search by name and check if the search bar works properly', async ({ page }) => {

      await Helper.clickOnMenue(page, '.nlsg-label-default', 'Manage');
      await Helper.clickOnSubMenu(page, '.menu-items', 'Users');

      await expect(page.getByText('Manage users')).toBeVisible();

      const searchText = await page
         .locator('#checkbox-section label')
         .nth(1)
         .innerText();

      await Helper.searchByTextInSearchBox(
         page,
         '#grid-search-input',
         searchText
      );

      await expect(page.getByText(searchText)).toBeVisible();
   });

   test('in manage user search by less than 3 characters and verify validation error', async ({ page }) => {

      await Helper.clickOnMenue(page, '.nlsg-label-default', 'Manage');
      await Helper.clickOnSubMenu(page, '.menu-items', 'Users');

      await expect(page.getByText('Manage users')).toBeVisible();

      await Helper.searchByTextInSearchBox(
         page,
         '#grid-search-input',
         'ab'
      );

      const searchBox = page.locator('#grid-search-input');

      await expect(searchBox).toHaveClass(/error/);
      await expect(searchBox).toHaveClass(/ng-invalid/);

      await expect(
         page.getByText('Minimum of 3 characters')
      ).toBeVisible();
   });

});