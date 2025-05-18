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
    await this.page.waitForLoadState("networkidle");

    try {
      //get productName cell in the first row
      const filter_prod_name = await this.filterEachCell(this.tableSelector, 0, 1);

      //check if product_name is found and assert
      if ((await filter_prod_name.innerText()).includes(productName)) {
        await expect(await filter_prod_name.innerText()).toBe(productName);
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
      logger.error(
        `❌ Cannot click 'Cart Icon' something went wrong: ${error}`
      );
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
  /**
   *
   * @method filterTableRow, will be reused across tables
   * @parameter take three parameters, @locator of the table, @index of each row and row_value to be search by
   */
  async filterTableRow(locator: Locator, index: number): Promise<Locator> {
    //allow html dom to fully load
    await this.page.waitForLoadState("domcontentloaded");
    //get table rows
    const table_rows = locator.getByRole("row");

    //filter each value in the row
    const returned_selector: Locator = table_rows.filter();

    //check any matching row are found
    if ((await returned_selector.count()) === 0) {
      throw new Error(`No row found for provided index: ${index}`);
    }

    //return first matching row
    return table_rows.nth(index).first();
  }
  /**
   * @method to return each cell in a row
   */

  async filterEachCell(
    locator: Locator,
    row_index: number,
    cell_index: number
  ): Promise<Locator> {
    //get each table row by index
    const current_row = await this.filterTableRow(locator, row_index);

    //return cell based on index provided
    return current_row.getByRole("cell").nth(cell_index);
  }
}
