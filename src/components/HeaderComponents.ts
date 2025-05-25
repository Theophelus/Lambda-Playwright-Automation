import { expect, Locator, Page } from "@playwright/test";
import logger from "../utils/LoggerUtils";
import { HelperComponents } from "./HelperComponents";

export class HeaderComponents {
  private readonly hoverMyAccountDropdownMenuSelector: Locator;
  private readonly hoverMyAccountDropdownMenuSelectorActive: Locator;
  private clickRegisterLinkInputSelector: Locator;
  private myAccountLoginSelectors: Locator;
  private shopByCategorySelector: Locator;
  private readonly helper: HelperComponents;

  constructor(private page: Page) {
    this.page = page;
    this.helper = new HelperComponents(this.page);
    this.hoverMyAccountDropdownMenuSelector = this.page.locator(
      "//a[@class='icon-left both nav-link dropdown-toggle']",
      { hasText: "My account" }
    );
    this.hoverMyAccountDropdownMenuSelectorActive = this.page.locator(
      "//a[@class='icon-left both nav-link dropdown-toggle active']",
      { hasText: "My account" }
    );
    this.myAccountLoginSelectors = this.page.locator(
      "ul.mz-sub-menu-96.dropdown-menu li div span"
    );
    this.shopByCategorySelector = this.page.locator("#entry_217832 a");
  }

  /**hover over My account dropdown menu */
  async hoverMyAccount(): Promise<void> {
    try {
      const myAccountIsActive =
        await this.hoverMyAccountDropdownMenuSelectorActive.isVisible();

      myAccountIsActive
        ? await this.hoverMyAccountDropdownMenuSelectorActive.hover()
        : await this.hoverMyAccountDropdownMenuSelector.hover();

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
      //highlight elements 
      this.helper.elementHighlighter(this.clickRegisterLinkInputSelector);
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

  /**
   *
   * @param expectedElements
   * @method once logged in verify all links under My account dropdown
   */
  async myAccountDropDownLinksAsCustomer(
    expectedElements: string[]
  ): Promise<void> {
    //get the list of dropdown with their values
    const dropdown_values = await this.myAccountLoginSelectors.allInnerTexts();

    //assert to check the length
    expect.soft(dropdown_values.length).toEqual(expectedElements.length);

    for (let i = 0; i < dropdown_values.length; i++) {
      const current_elem = dropdown_values[i];
      const expected = expectedElements[i];

      try {
        //verify results
        await expect.soft(current_elem).toBe(expected);
        logger.info(
          `✅ My account dropdown Menu at position ${i} as this value ${current_elem} `
        );
      } catch (error) {
        logger.error(
          `❌ Mismatch at position ${i}: got ${current_elem} but expected ${expected}`
        );
        throw error;
      }
    }
  }

  /**
   * @method to click Shop By Category link
   *
   */
  async clickShopByCategoryLink(): Promise<void> {
    try {
       await this.helper.elementHighlighter(this.shopByCategorySelector)
      await this.shopByCategorySelector.click();
      logger.info(
        `✅ '${await this.shopByCategorySelector.innerText()} is clicked'`
      );
    } catch (error) {
      logger.error(
        `❌ Error while trying to click: ${await this.shopByCategorySelector.innerText()}: ${error}`
      );
      throw error;
    }
  }
}
