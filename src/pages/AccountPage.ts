import { test, Page, expect, Locator } from "@playwright/test";
import { HeaderComponents } from "../components/HeaderComponents";
import { PageInterface } from "./PageInterface";
import { AssertionsComponents } from "../components/AssertionsComponents";
import { HelperComponents } from "../components/HelperComponents";

export class AccountPage {
  // private readonly page: Page;
  private readonly headerComponent: HeaderComponents;
  // private readonly components: PageInterface;
  private readonly assertion: AssertionsComponents;
  private readonly helper: HelperComponents;

  //locators
  private readonly myAccountHeader: Locator;

  constructor(private page: Page) {
    this.page = page;
    //initialize components
    this.headerComponent = new HeaderComponents(this.page);
    this.assertion = new AssertionsComponents(this.page);
    this.helper = new HelperComponents(this.page);
    //initialize locators
    this.myAccountHeader = this.page.locator(
      "//h2[contains(text(), 'My Account')]"
    );
  }

  async expectedMyAccountTitleToBeVisible(): Promise<void> {
    //hightlight element
    await this.helper.elementHighlighter(this.myAccountHeader);
    //verify element
    await this.assertion.assertVesible(this.myAccountHeader);
  }

  async hoverOverMyAccount(): Promise<void> {
    await this.headerComponent.hoverMyAccount();
  }
}
