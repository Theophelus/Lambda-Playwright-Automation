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

  //**click Register Link from My account dropdown menu */
  async clickMyAccountLinks(element: string): Promise<void> {
    try {
      let selector: string = this.myAccountDropdownLocator(element);
      this.clickRegisterLinkInputSelector = this.page.locator(selector);
      //click register link
      await this.clickRegisterLinkInputSelector.click();
      logger.info(
        `✅ clicking ${element} link from 'My account' dropdown menu.`
      );
    } catch (error) {
      let registerLink: string | null =
        await this.clickRegisterLinkInputSelector.textContent();
      logger.error(`❌ Error while clicking ${registerLink} link: ${error}`);
      throw error;
    }
  }

  //My account dropdown menu locator
  myAccountDropdownLocator(element: string): string {
    return `//a[@href='https://ecommerce-playground.lambdatest.io/index.php?route=account/${element}']`;
  }

}
