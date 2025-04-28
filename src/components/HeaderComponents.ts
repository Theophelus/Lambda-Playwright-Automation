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

}
