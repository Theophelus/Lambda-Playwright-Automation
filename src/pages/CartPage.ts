import { expect, Locator, Page } from "@playwright/test";
import logger from "../utils/LoggerUtils";

export class CartPage {
  private readonly viewCartSelector: Locator;
  private tableSelector: Locator;

  constructor(private page: Page) {
    this.page = page;
    this.viewCartSelector = this.page.locator(
      "//a[@class='btn btn-primary btn-block']"
    );
    this.tableSelector = this.page.locator(
      "//table[@class='table table-bordered']//tbody"
    );
  }

  /**
   * @method to click view cart button
   */
  async clickViewCartIcon(): Promise<void> {
    try {
      await this.viewCartSelector.click();
      logger.info(`✅ Clicked 'View Cart' button`);
    } catch (error) {
      logger.error(`❌ Could not click 'View Cart' button: ${error}`);
      throw error;
    }
  }
}
