import { Page, expect, Locator } from "@playwright/test";
import { typeRequireText } from "../components/Inputs";
import logger from "../utils/LoggerUtils";

export class ProductsPage {
  //define locators
  private readonly searchForProductSelector: Locator;
  private readonly listOfSearchProductSelector: Locator;

  constructor(private page: Page) {
    this.page = page;
    this.searchForProductSelector = this.page.locator(
      `input[data-autocomplete='5'][placeholder='Search For Products']`
    );

    this.listOfSearchProductSelector = this.page.locator(
      "//div//ul[@class='dropdown-menu autocomplete w-100']//li//h4//a"
    );
  }

  /**
   * @method to filter a specif product from the 'Search For Product' textbox and click it
   * @param product to control the filter base
   */

  async searchForASpecificProductAndClick(product: string): Promise<void> {
    //search for a product
    await typeRequireText(product, this.searchForProductSelector);

    //implicit wait to allow elements to load
    await this.page.waitForTimeout(4000);

    //filter for specific product by text
    const filtered_product = this.listOfSearchProductSelector.filter({
      hasText: product,
    });

    //assert list is not empty
    expect(await filtered_product.count()).toBeGreaterThan(0);

    //check if element exists and click
    try {
      if ((await filtered_product.count()) > 0) {
        //click the first product that meets the criteria
        await filtered_product.first().click();
        //implicit wait to allow elements to load
        await this.page.waitForTimeout(20000);
        logger.info(`✅ clicking ${product} product from 'Search For Product' textbox.`);
      }
    } catch (error) {
      logger.error(`❌ Error while trying to click '${product}': ${error}`);
      throw error;
    }
  }
}
