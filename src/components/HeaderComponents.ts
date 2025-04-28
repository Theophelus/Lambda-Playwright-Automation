import { Locator, Page } from "@playwright/test";
import logger from "../utils/LoggerUtils";

export class HeaderComponents {
  private readonly hoverMyAccountDropdownMenuSelector: Locator;
  private clickRegisterLinkInputSelector: Locator;

  constructor(private page: Page) {
    this.page = page;
    this.hoverMyAccountDropdownMenuSelector = this.page.locator(
      "//a[@class='icon-left both nav-link dropdown-toggle']//span[contains(text(), 'My account')]"
    );
  }

  /**hover over My account dropdown menu */
  async hoverMyAccount(): Promise<void> {
    try {
      await this.hoverMyAccountDropdownMenuSelector.hover();
      logger.info("✅ successfully hovered over 'My account' dropdown menu.");
    } catch (error) {
      logger.error(
        `❌ Error while hovering over My account dropdown menu: ${error}`
      );
      throw error;
    }
  }
}
