import { Page, expect, Locator } from "@playwright/test";
import { typeRequireText } from "../components/Inputs";
import logger from "../utils/LoggerUtils";
import { HeaderComponents } from "../components/HeaderComponents";
import { clickSpecificCategory } from "../components/CategoryComponent";
import { add } from "winston";

export class ProductsPage {
  //define locators
  private readonly searchForProductSelector: Locator;
  private readonly listOfSearchProductSelector: Locator;
  private readonly productHeaderSelector: Locator;
  private readonly topCategorySelector: Locator;
  private readonly categoryTitleSelector: Locator;
  private readonly listOfProductsSelector: Locator;
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
    this.listOfProductsSelector = this.page.locator(
      "//*[@class='product-layout product-grid no-desc col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6']//div[@class='product-thumb']"
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
  /**
   * @method, define a method that takes one @parameter to add a product to the cart.
   */
  async addProductToCart(productName: string): Promise<void> {
    //define local selectors
    const next_button_selector = this.page.locator(
      '//*[@id="entry_212409"]/div/div[1]/ul/li[6]/a'
    );

    //define a variable to control the loop
    let is_found: boolean = false;

    //define a while loop as long the value is not false
    while (!is_found) {
      let list_of_products = await this.listOfProductsSelector.all();
      //filter the list and hover over a product before selecting
      for (let current_product of list_of_products) {
        if ((await current_product.innerText()).includes(productName)) {
          is_found = true;
          await current_product.hover();

          //click cart icon
          const add_to_cart_btn = current_product
            .locator("..//button[@title='Add to Cart']")
            .first();
          await add_to_cart_btn.hover({ timeout: 4000 });
          await add_to_cart_btn.dblclick();
          break;
        }
      }

      //break if the product is found
      if (is_found) break;

      //check if the product is not found then go th the next page
      if ((await next_button_selector.count()) > 0) {
        await next_button_selector.click();
        //refresh product list
        list_of_products = await this.listOfProductsSelector.all();
      }
    }
  }
}
