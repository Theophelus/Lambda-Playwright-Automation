import { test } from "../fixtures/PageFixture";

test.describe("Products pages test cases", () => {
  test("Search and View a Product as a returning Customer", async ({
    homePage,
    loginPage,
    productsPage,
  }) => {
    //navigate
    await homePage.navigate();

    //action
    await loginPage.clickLoginAccountLink();
    //fill form
    await loginPage.fillInLoginForm();
    //click login button
    const accountPage = await loginPage.clickLoginBtn();
    //assertion
    await accountPage.expectedMyAccountTitleToBeVisible();

    //navigate to Search For Products textbox and search for a product.
    productsPage.searchForASpecificProductAndClick("Samsung SyncMaster 941BW");
    //assertion
    productsPage.assertProductHeaderTitle();
  });
});
