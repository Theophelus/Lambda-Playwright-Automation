import { Page, expect, Locator } from "@playwright/test";
import { typeRequireText } from "../components/Inputs";
import logger from "../utils/LoggerUtils";
import { HeaderComponents } from "../components/HeaderComponents";
import { clickSpecificCategory } from "../components/CategoryComponent";

export class ProductsPage {
  //define locators
  private readonly searchForProductSelector: Locator;
  private readonly listOfSearchProductSelector: Locator;
  private readonly productHeaderSelector: Locator;
  private readonly topCategorySelector: Locator;
  private readonly categoryTitleSelector: Locator;
  private readonly headerComponent: HeaderComponents;

  constructor(private page: Page) {
    this.page = page;
    this.headerComponent = new HeaderComponents(this.page);
    this.searchForProductSelector = this.page.locator(
      `input[data-autocomplete='5'][placeholder='Search For Products']`
    );

    this.listOfSearchProductSelector = this.page.locator(
      "//div//ul[@class='dropdown-menu autocomplete w-100']//li//h4//a"
    );
    this.productHeaderSelector = this.page.locator("div#entry_216816 h1");
    this.topCategorySelector = this.page.locator(
      "//ul[@class='navbar-nav vertical']//li//a"
    );
    this.categoryTitleSelector = this.page.locator("#entry_212392 h1");
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
        // await this.page.waitForTimeout(15000);
        logger.info(
          `✅ clicking ${product} product from 'Search For Product' textbox.`
        );
      }
    } catch (error) {
      logger.error(`❌ Error while trying to click '${product}': ${error}`);
      throw error;
    }
  }
  /**
   * Assert product Header title
   */

  async assertProductHeaderTitle(): Promise<void> {
    try {
      await expect(this.productHeaderSelector).toBeVisible();
      logger.info(
        `✅ ${this.productHeaderSelector.innerText()} product header is verified.`
      );
    } catch (error) {
      logger.error(
        `❌ Error while trying to verify '${this.productHeaderSelector.innerText()} header': ${error}`
      );
      throw error;
    }
  }
  /**
   * @method to click Shop By Category Link from Header
   */
  async clickShopByCategoryLink(): Promise<void> {
    await this.headerComponent.clickShopByCategoryLink();
  }
  /**
   * @method to select a specific category from the list
   */
  async selectSpecificCategory(category_name: string): Promise<void> {
    await clickSpecificCategory(category_name, this.topCategorySelector);
  }
  /**
   * @method to verify category title after filters
   */
  async verifyCategoryTitle(): Promise<void> {
    try {
      await expect(this.categoryTitleSelector).toBeTruthy();
      logger.info(
        `✅ ${await this.categoryTitleSelector.innerText()} Category title is verified`
      );
    } catch (error) {
      logger.error(`❌ Category title could not be verified: ${error}`);
      throw error;
    }
  }
}
