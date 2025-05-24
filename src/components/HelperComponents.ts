import { Locator, Page } from "@playwright/test";

export class HelperComponents {
  constructor(private page: Page) {}

  //get selector innerText()
  async innerText(locator: Locator): Promise<string> {
    return await locator.innerText();
  }
  //get input value or e.g textbox
  async inputValue(loactor: Locator): Promise<string> {
    return await loactor.inputValue();
  }
  //get all elements in the list
  async allElements(locators: Locator): Promise<Array<string>> {
    const counter = await locators.count();
    const all_elements: string[] = [];

    for (let i = 0; i < counter; i++) {
      let current_elem = await locators.nth(i).innerText();
      all_elements.push(current_elem);
    }
    return all_elements;
  }

  //element highlighter to increase visibility
  async elementHighlighter(locator: Locator): Promise<void> {
    //if locator is visible
    if (await locator.isVisible()) {
      //evaluate element to reach dom/html element
      await locator.evaluate((elem) => {
        //store origin color elem
        const original_style = elem.style.outline;
        elem.style.outline = `3px solid red`;
        //reset to original color
        setTimeout(() => {
          elem.style.outline = original_style || "";
        }, 200);
      });
    }
  }
}
