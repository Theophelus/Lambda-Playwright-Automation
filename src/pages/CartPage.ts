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
    let is_found = false;
    let index = 0;
    while (!is_found) {
      try {
        //get productName cell in the first row
        const filter_prod_name = await this.filterEachCell(this.tableSelector, index, 1);
        //check if product_name is found and assert
        if ((await filter_prod_name.innerText()).includes(productName)) {
          await expect(await filter_prod_name.innerText()).toBe(productName);
          logger.info(`✅ ${productName} is added to the cart successfully verified`);
          is_found = true;
          break;
        }
        index++;

        if(is_found) break;
        //not found
        throw new Error(`${productName} is not found`);
      } catch (error) {logger.error(`❌ ${productName} not found and verified in the cart: ${error}`);
        throw error;
      }
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
      logger.error(`❌ ${message} is not displayed: ${error}`);
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
      throw new Error(`❌ No row found for provided index: ${index}`);
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
  /**
   * @method - update quanity of specific product in the cart
   * @param product_name - product name to control condition
   * @param product_quantity - value to updat the quantity
   */
  async updateProductQuantity(product_name: string, product_quantity: number) {
    let index = 0;
    let is_found = false;
    //go through each row
    while (!is_found) {
      try {
        let current_cell = await this.filterEachCell(
          this.tableSelector,
          index,
          1
        );
        let product_cell_name = await current_cell.innerText();
        //check if product_cell_name meet condition
        if (product_cell_name.includes(product_name)) {
          // get product rows
          const product_quantity_cell: Locator = await this.filterEachCell(
            this.tableSelector,
            index,
            3
          );
          let update_quantity = product_quantity_cell.locator("//..//input");
          let press_update_btn = product_quantity_cell.locator(
            "//..//button[@type='submit']"
          );
          //convert number into string the fill quantity input
          await update_quantity.fill(product_quantity.toString(), {
            timeout: 900,
          });
          // press update quantity button
          await press_update_btn.click();
          logger.info(
            `✅ ${product_name} quantity have been updated to ${product_quantity}`
          );
          is_found = true;
          return true;
        }
        index++;
      } catch (error) {
        logger.error(
          `❌ $Error occured while updating product: ${product_name} to quantity of: ${product_quantity}: ${error}`
        );
        throw error;
      }
      //break out of the loop
      if (is_found) break;
    }
  }
  /**
   * @method to calculate and verify product pricebased on product unit price and quantity
   * @param product - be used to control the condition and verify product total price based on product unit price and quantity
   */

  async verifyProductTotalPriceIsRecalculated(product: string): Promise<void> {
    //control the loop
    let is_found = false;
    let index = 0;
    //go throught each cell
    while (!is_found) {
      try {
        //get each cell in the table
        let curreny_cell = this.filterEachCell(this.tableSelector, index, 1);
        //check current product meets criteria
        if ((await (await curreny_cell).innerText()).includes(product)) {
          //get current product quantity value
          let product_quantity = this.filterEachCell(
            this.tableSelector,
            index,
            3
          );
          let product_quantity_value: any = (await product_quantity)
            .locator("//..//input")
            .getAttribute("value");

          //get the unit price of the current_cell
          let get_unit_price = (
            await this.filterEachCell(this.tableSelector, index, 4)
          ).innerText();
          let unit_price: any = parseFloat(
            (await get_unit_price).split("$")[1]
          );

          let total_price =
            parseFloat((await product_quantity_value) || "0") * unit_price;
          let product_total_price = await (
            await this.filterEachCell(this.tableSelector, index, 5)
          ).innerText();

          const expected_price_total = total_price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

          //assert
          expect(expected_price_total).toBe(product_total_price);
          logger.info(
            `✅ Product total price of: ${product_total_price} have been verified, based on product Quantity updated: ${await product_quantity_value} and Unit Price of : ${await get_unit_price}`
          );
          is_found = true;
          break;
        }

        index++;
      } catch (error) {
        logger.error(
          `❌ $Error occured while updating product: to quantity of: ${error}`
        );
        throw error;
      }
      //break the loop once condition met
      if (is_found) break;
      //if product not found
      throw new Error(`❌ ${product} not found in the Cart`);
    }
  }
}
