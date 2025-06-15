import { Page, Locator } from "@playwright/test";

export class NavigationComponent {
  constructor(private page: Page) {
    this.page = page;
  }
  //navigation
  async navigateToHomePage(): Promise<void> {
    await this.page.goto("/");
  }

  //relosad page
  async reload(): Promise<void> {
    await this.page.reload();
  }
  //go to the previous page
  async goBack(): Promise<void> {
    await this.page.goBack();
  }
  //go to the next page
  async goForward(): Promise<void> {
    await this.page.goForward();
  }
  //wait for page to load
  async waitForLoadState(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
  }
}
