import { Locator, Page } from "@playwright/test";
import { PageComponents } from "./PageComponents";
import { AssertionsComponents } from "../components/AssertionsComponents";
import logger from "../utils/LoggerUtils";
import { HelperComponents } from "../components/HelperComponents";
import { ActionsComponents } from "../components/ActionsComponents";
const newAddress = require("../data/address.json");

export class CheckoutPage {
  
  //define locators
  private readonly billingAddrssSelector: Locator;
  private readonly newAddressSelector: Locator;
  private readonly firstName: Locator;
  private readonly lastname: Locator;
  private readonly address: Locator;
  private readonly city: Locator;
  private readonly postalAddress: Locator;
  private readonly country: Locator;
  private readonly listOfCountries: Locator;
  private readonly region: Locator;
  private readonly termsAndConditionsSelector: Locator;
  private readonly continueBtnSelector: Locator;
  //define components interface
  private readonly components: PageComponents;

  constructor(private page: Page) {
    this.page = page;
    //initialize locators
    this.billingAddrssSelector = page.getByRole("heading", {name: "Billing Address"});
    this.newAddressSelector = page.getByLabel("I want to use a new address");
    this.firstName = page.getByPlaceholder("First Name");
    this.lastname = page.getByPlaceholder("Last Name");
    this.address = page.getByPlaceholder("Address 1");
    this.city = page.getByPlaceholder("City");
    this.postalAddress = page.getByPlaceholder("Post Code");
    this.country = page.locator("#input-payment-country");
    this.listOfCountries = page.locator("#input-payment-country");
    this.region = page.locator("#input-payment-zone");
    this.termsAndConditionsSelector = page.locator("//label[@for='input-agree']");
    this.continueBtnSelector = page.locator("//button[@id='button-save']");

    //initialize components
    this.components = {
      assertions: new AssertionsComponents(this.page),
      helper: new HelperComponents(this.page),
      actions: new ActionsComponents(this.page)
    };
  }

  //verfiy Billing Address header
  async verifyBillingAddressHeader() {
    // await this.page.waitForLoadState("domcontentloaded")
    try {
      await this.components.assertions?.assertVesible(this.billingAddrssSelector);
      //highlight Billing Address element
      await this.components.helper?.elementHighlighter(this.billingAddrssSelector);
      logger.info(`${await this.billingAddrssSelector.innerText()} is verified successfuly.`);
    } catch (error) {
      logger.error(`${await this.billingAddrssSelector.innerText()} could not be verified: {error`);
      throw error;
    }
  }

  /**
   * @method to checkout with new address
   */
  async checkOutWithNewAddress(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
    //click new address radio button
    await this.newAddressSelector.check();
    //check if the file is not empty
    if (newAddress.address.length === 0) {
      logger.warn(`⚠️ Address object is empty`);
      return;
    }
    //get address object
    const address = newAddress.address;

    try {
      /**
       * enter the following parameter to the Billing Address form
       * @firstname 
       * @lastname 
       * @address
       * @city 
       * @country
       * @region
       */
      this.firstName.fill(address.full_name);
      this.lastname.fill(address.last_name);
      this.address.fill(address.street_address);
      this.city.fill(address.city);
      this.postalAddress.fill(address.postal_code);
      //click country dropdown and select country
      await this.country.click();
      await this.components.helper?.filterByName(this.listOfCountries, address.country);
      // click region dropdown menu and select province
      await this.region.click({timeout: 3000});
      await this.components.helper?.filterByName(this.region, address.province);
    } catch (error) {
      logger.error(`❌ Something went wrong while filling Billing Address the form. ${error}`);
      throw error;
    }
  }
   async checkTermsAndConditon() {
    await this.page.waitForLoadState("domcontentloaded");
    try {
      this.termsAndConditionsSelector.check();
      logger.info(`${await this.components.helper?.innerText(this.termsAndConditionsSelector)} checkbox is checked`);
      
    } catch (error) {
      logger.error(` have read and agree to the Terms & Conditions checkbox is not checked: ${error}`)
      throw error;
    }
  }

  async clickContinueButton() {
    try {
      this.components.actions?.click(this.continueBtnSelector);
      await this.page.waitForTimeout(10000);
      logger.info(`${await this.components.helper?.innerText(this.continueBtnSelector)} button is clicked.`);
    } catch (error) {
      logger.error(`Continue button could not be clicked: ${error}`)
      throw error;
    }
  }

}
