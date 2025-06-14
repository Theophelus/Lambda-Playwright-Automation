import { Locator, Page } from "@playwright/test";
import logger from "../utils/LoggerUtils";
import { PageComponents } from "../pages/PageComponents";
import { ActionsComponents } from "./ActionsComponents";
import { time } from "console";

export class HelperComponents {
  private readonly components: PageComponents;
  constructor(private page: Page) {
    this.page = page;
    this.components = {
      actions: new ActionsComponents(this.page),
    };
  }

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

  //filter table rows
  async filterTableRows(locator: Locator, rowIndex: number): Promise<Locator> {
    //allow html dom to fully load
    await this.page?.waitForLoadState("domcontentloaded");
    //get rows in the table,
    const table_rows = await locator.getByRole("row");
    let count_table_rows = await table_rows.count();
    //if table count is 0 throw new error
    if (count_table_rows === 0 || count_table_rows < 0) {
      throw new Error(`❌ No row found for provided index: ${rowIndex}`);
    }
    //return specific row
    return table_rows.nth(rowIndex);
  }

  //filter row cells an return a specifc cell
  async filterRowCells(locator: Locator, rowIndex: number, rowCell: number): Promise<Locator> {
    //get specific cell
    const specific_row = await this.filterTableRows(locator, rowIndex);
    const row_cell_counter = specific_row
      .getByRole("cell")
      .nth(rowCell)
      .count();

    if ((await specific_row.count()) < 0 || (await row_cell_counter) === 0) {
      throw new Error(`Row and Cell can not be empty`);
    }
    //return cell based on row index and cell value
    return specific_row.getByRole("cell").nth(rowCell);
  }

  //define a method to filter a dropdown by name
  async filterByName(dropdownLocacor: Locator, valueName: string): Promise<any> {

    try {
       //apply playwright filter to find a specific country
      const country_filtered = dropdownLocacor
        .locator("option")
        .filter({ hasText: valueName });

      //check if the list of countries are empty
      if ((await country_filtered.count()) === 0) {
        logger.warn(`⚠️ dropdown menu is empty`);
        return;
      }

      if (await this.innerText(country_filtered) === valueName) {
        await this.components.actions?.selectOptionByLabel(dropdownLocacor, valueName, 7000);
        logger.info(`✅ "${await this.innerText(country_filtered)}" selected from list dropdown menu.`);
        return;
      }
    } catch (error) {
      logger.error(`❌ ${valueName} is not found from the dropdown menu: ${error}`);
      throw error;
    }
  }
}
