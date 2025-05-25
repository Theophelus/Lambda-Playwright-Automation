import { expect, Locator, Page } from "@playwright/test";
import logger from "../utils/LoggerUtils";
import { error } from "console";
import { HelperComponents } from "../components/HelperComponents";

export class CartPage {
  private readonly viewCartSelector: Locator;
  private readonly tableSelector: Locator;
  private readonly cartIconSelector: Locator;
  private readonly cartMessageSelector: Locator;
  private readonly helper: HelperComponents;

  constructor(private page: Page) {
    this.page = page;
    //components
    this.helper = new HelperComponents(this.page);
    //locators
    this.viewCartSelector = this.page.locator("//a[@class='btn btn-primary btn-block']");
    this.tableSelector = this.page.locator("//table[@class='table table-bordered']//tbody");
    this.cartIconSelector = this.page.locator("#entry_217825");
    this.cartMessageSelector = this.page.locator("div#entry_217847 p");
  }

  /**
   * @method to click view cart button
   */
  async clickViewCartIcon(): Promise<void> {
    try {

      //highlight 'view cart button'
      await this.helper.elementHighlighter(this.viewCartSelector);
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
  async verifyProductNameInTheCart(productName: string): Promise<any> {
    await this.page.waitForLoadState("networkidle");
    let is_found = false;
    let index = 0;
    while (!is_found) {
      try {
        //get productName cell in the first row
        const filter_prod_name = await this.helper.filterRowCells(this.tableSelector, index, 1);
        //check if product_name is found and assert
        if ((await this.helper.innerText(filter_prod_name)) === productName) {
          //highlight product name in the cart
          await this.helper.elementHighlighter(filter_prod_name);
          expect(await this.helper.innerText(filter_prod_name)).toBe(productName);
          logger.info(`✅ ${productName} is added to the cart successfully verified`);
          is_found = true;
          return true;
        } else {
          index++;
        }
        if (is_found) break;
        //not found
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
      //highlight Cart Icon
      await this.helper.elementHighlighter(this.cartIconSelector);
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

      //element highlighter
      await this.helper.elementHighlighter(this.cartMessageSelector)
      //highlight product name in the cart
      await this.helper.elementHighlighter(this.cartMessageSelector);
      expect(await this.cartMessageSelector.innerText()).toBe(message);
       logger.info(`${message} is displayed and verified.`);
    } catch (error) {
      logger.error(`❌ ${message} is not displayed: ${error}`);
      throw error;
    }
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
        let current_cell = await this.helper.filterRowCells(this.tableSelector, index, 1);
        let product_cell_name = await this.helper.innerText(current_cell);
        //check if product_cell_name meet condition
        if (product_cell_name.includes(product_name)) {
          // get product rows
          const product_quantity_cell: Locator = await this.helper.filterRowCells(
            this.tableSelector,index,3);
          let update_quantity = product_quantity_cell.locator("//..//input");
          let press_update_btn = product_quantity_cell.locator("//..//button[@type='submit']");

          //convert number into string the fill quantity input
          await update_quantity.fill(product_quantity.toString(), {
            timeout: 900,
          });
          // press update quantity button
          await press_update_btn.click();
          logger.info(`✅ ${product_name} quantity have been updated to ${product_quantity}`);
          is_found = true;
          return true;
        } else {
          index++;
        }

        //break out of the loop
        if (is_found) break;
      } catch (error) {
        logger.error(`❌ $Error occured while updating product: ${product_name} to quantity of: ${product_quantity}: ${error}`);
        throw error;
      }
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
        let curreny_cell = await this.helper.filterRowCells(this.tableSelector, index, 1);
        //check current product meets criteria
        const product_cell_name = await (await curreny_cell).innerText();
        if (product_cell_name === product) {
          //get current product quantity value
          let product_quantity = this.helper.filterRowCells(
            this.tableSelector, index, 3);

          let product_quantity_value: any = (await product_quantity)
            .locator("//..//input")
            .getAttribute("value");

          //get the unit price of the current_cell
          let get_unit_price = (await this.helper.filterRowCells(this.tableSelector, index, 4)).innerText();
          let unit_price: any = parseFloat((await get_unit_price).split("$")[1]);

          let total_price =parseFloat((await product_quantity_value) || "0") * unit_price;
          let product_total_price = await (await this.helper.filterRowCells(this.tableSelector, index, 5)).innerText();

          const expected_price_total = total_price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          //assert
          expect(expected_price_total).toBe(product_total_price);
          logger.info(`✅ Product total price of: ${product_total_price} have been verified, based on product Quantity updated: ${await product_quantity_value} and Unit Price of : ${await get_unit_price}`);
          is_found = true;
          break;
        } else {
          index++;
        }
        //break the loop once condition met
        if (is_found) break;
        // //if product not found
      } catch (error) {logger.error(`❌ $Error occured while updating product: to quantity of: ${error}`);
        throw error;
      }
    }
  }
}
