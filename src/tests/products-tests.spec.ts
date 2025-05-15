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
    await loginPage.hoverMyAccount();
    await loginPage.clickLoginAccountLink();
    //fill form
    await loginPage.fillInLoginForm();
    //click login button
    const accountPage = await loginPage.clickLoginBtn();
    //assertion
    await accountPage.expectedMyAccountTitleToBeVisible();

    //navigate to Search For Products textbox and search for a product.
    await productsPage.searchForASpecificProductAndClick(
      "Samsung SyncMaster 941BW"
    );
    //assertion
    await productsPage.assertProductHeaderTitle();
  });

  test("Search Products by Category as a return Customer", async ({
    homePage,
    loginPage,
    productsPage,
  }) => {
    //navigate
    await homePage.navigate();

    //action
    await loginPage.hoverMyAccount();
    await loginPage.clickLoginAccountLink();
    //fill form
    await loginPage.fillInLoginForm();
    //click login button
    const accountPage = await loginPage.clickLoginBtn();
    //assertion
    await accountPage.expectedMyAccountTitleToBeVisible();

    //click Shop by Category Link
    await productsPage.clickShopByCategoryLink();
    //select category from the list
    await productsPage.selectSpecificCategory(" Laptops & Notebooks");

    //Assert title
    await productsPage.verifyCategoryTitle();
  });
});
