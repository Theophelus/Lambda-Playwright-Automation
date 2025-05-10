import { test, Page, expect, Locator } from "@playwright/test";
import { HeaderComponents } from "../components/HeaderComponents";

export class AccountPage {
  private readonly myAccountHeaderLocator: Locator;
  private readonly headerComponent: HeaderComponents;

  constructor(private page: Page) {
    this.page = page;
    this.headerComponent = new HeaderComponents(page);
    this.myAccountHeaderLocator = this.page.locator(
      "//h2[contains(text(), 'My Account')]"
    );
  }

  async expectedMyAccountTitleToBeVisible(): Promise<void> {
    await expect(this.myAccountHeaderLocator).toBeVisible({ timeout: 5000 });
  }

  async hoverOverMyAccount(): Promise<void> {
    await this.headerComponent.hoverMyAccount();
  }
}
