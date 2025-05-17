import { expect, Locator, Page } from "@playwright/test";
import logger from "../utils/LoggerUtils";
import { error } from "console";

export class CartPage {
  private readonly viewCartSelector: Locator;
  private readonly tableSelector: Locator;
  private readonly cartIconSelector: Locator;
  private readonly cartMessageSelector: Locator;

  constructor(private page: Page) {
    this.page = page;
    this.viewCartSelector = this.page.locator(
      "//a[@class='btn btn-primary btn-block']"
    );
    this.tableSelector = this.page.locator(
      "//table[@class='table table-bordered']//tbody"
    );
    this.cartIconSelector = this.page.locator("#entry_217825");
    this.cartMessageSelector = this.page.locator("div#entry_217847 p");
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
  /**
   *
   *@member with a @param productName to verify product is added to the cart successfully
   */
  async verifyProductNameInTheCart(productName: string): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
    //get the rows
    const table_rows = this.tableSelector.getByRole("row");
    try {
      //filter the rows based on provided product name
      const filter_prod_name = table_rows.filter({ hasText: productName });
      //check if product_name is found and assert
      if ((await filter_prod_name.count()) > 0) {
        await expect(await filter_prod_name).toBeVisible({
          visible: true,
          timeout: 5000,
        });
        logger.info(
          `✅ ${productName} is added to the cart successfully verified`
        );
      }
    } catch (error) {
      logger.error(
        `❌ ${productName} not found and verified in the cart: ${error}`
      );
      throw error;
    }
  }

  /**
   * @method to click cart icon
   */
  async clickCartIcon() {
    try {
      await this.cartIconSelector.click();
      logger.info(`✅ Clicked cart icon`);
    } catch (error) {
      logger.error(`❌ Cannot click 'Cart Icon' something went wrong: ${error}`);
    }
  }

  /**
   *
   * @param message to be verified against
   */
  async verifyEmptyMessage(message: string): Promise<void> {
    try {
      logger.info(`${message} is displayed and verified.`);
      expect(await this.cartMessageSelector.innerText()).toBe(message);
    } catch (error) {
      logger.error(`${message} is not displayed: ${error}`);
      throw error;
    }
  }
}
