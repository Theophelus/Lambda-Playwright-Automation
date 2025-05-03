import { test, Page, expect, Locator } from "@playwright/test";

export class AccountPage {

  private readonly myAccountHeaderLocator: Locator;
  
  constructor(private page: Page) {
    this.page = page;
    this.myAccountHeaderLocator = this.page.locator(
      "//h2[contains(text(), 'My Account')]"
    );
  }

  async expectedMyAccountTitleToBeVisible(): Promise<void> {
    await expect(this.myAccountHeaderLocator).toBeVisible({ timeout: 5000 });
  }
}
