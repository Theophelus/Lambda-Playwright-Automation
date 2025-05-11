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
}
