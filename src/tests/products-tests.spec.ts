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

  test.only("Verify that a Returning Customer can Search and Add a Product to the Cart.", async ({
    homePage,
    loginPage,
    productsPage,
  }) => {
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

    //filter for a specific product
    let searched_product = "iPod Touch";
    const cart_page = await productsPage.addProductToCart(searched_product);

    //click cart page and verify product is added successfully to the cart
    await cart_page.clickViewCartIcon();
    // cerify product name in the cart
    await cart_page.verifyProductNameInTheCart("iPod Touch ***");
  });

  test(`Auto-suggestion in the search bar`, async ({}) => {});
});
