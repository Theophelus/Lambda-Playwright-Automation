import { Page, Locator } from "@playwright/test";
import { HeaderComponents } from "../components/HeaderComponents";
import { PageComponents } from "./PageComponents";
import { AssertionsComponents } from "../components/AssertionsComponents";
import { HelperComponents } from "../components/HelperComponents";


export class AccountPage {
  //components object to used as object literal
  private readonly components: PageComponents;
  //locators
  private readonly myAccountHeader: Locator;

  constructor(private page: Page) {
    this.page = page;

    //initialize components
    this.components = {
      assertions: new AssertionsComponents(this.page),
      helper: new HelperComponents(this.page),
      header: new HeaderComponents(this.page),
    };

    //initialize locators
    this.myAccountHeader = this.page.locator("//h2[contains(text(), 'My Account')]");
  }


  async expectedMyAccountTitleToBeVisible(): Promise<void> {
    //hightlight element
    await this.components.helper?.elementHighlighter(this.myAccountHeader);
    //verify element
    await this.components.assertions?.assertVesible(this.myAccountHeader);
  }

  async hoverOverMyAccount(): Promise<void> {
    await this.components.header?.hoverMyAccount();
  }
}
