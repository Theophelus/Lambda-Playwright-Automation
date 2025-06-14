import { Locator, Page } from "@playwright/test";

export class ActionsComponents {
  constructor(private page: Page) {}

  //click elements in the dom
  async click(locator: Locator, element?: string): Promise<void> {
    //get element innerText();
    await locator.click();
  }
  //fill input box
  async fill(locator: Locator,value: string,element_description?: string): Promise<void> {
    await locator.fill(value);
  }
  //check checkboxes and radio button
  async check(locator: Locator): Promise<void>{
    await locator.check();
  }
  //selectOption from dropdown menu
  async selectOptionByLabel(dropdownLocator: Locator, element: string, timeout?: number){
    await dropdownLocator.selectOption({label: element}, {timeout: timeout})
  }
}
