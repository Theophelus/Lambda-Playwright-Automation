import { test } from "../fixtures/PageFixture";

test.describe(`Cart Page - Registered Customer`, () => {
  test.skip(`Verify the cart displays empty message`, async ({
    homePage,
    loginPage,
    cartPage,
  }) => {
    //test execution
    await homePage.navigate();
    await loginPage.hoverMyAccount();
    await loginPage.clickLoginAccountLink();
    await loginPage.fillInLoginForm();
    //actions
    const account_page = await loginPage.clickLoginBtn();
    await account_page.expectedMyAccountTitleToBeVisible();
    await cartPage.clickCartIcon();
    //assertions
    await cartPage.verifyEmptyMessage("Your shopping cart is empty!");
  });

  test("Returning Customer should be able to update product quantity", async ({
    homePage,
    loginPage,
    productsPage,
    cartPage,
  }) => {
    const product_data = {
      product_name: "iPod Nano",
      product_quantity: 4
      // product_total: "$186.40",
    };
    //test execution
    await homePage.navigate();
    await loginPage.hoverMyAccount();
    await loginPage.clickLoginAccountLink();
    await loginPage.fillInLoginForm();
    //actions
    const account_page = await loginPage.clickLoginBtn();
    await account_page.expectedMyAccountTitleToBeVisible();

    await productsPage.clickShopByCategoryLink();
    await productsPage.selectSpecificCategory("Laptops & Notebooks");
    await productsPage.addProductToCart(product_data.product_name);
    await cartPage.clickViewCartIcon();
    //update cart quantity per product to
    await cartPage.updateProductQuantity(product_data.product_name, product_data.product_quantity);
    // await cartPage.verifyProductTotalPriceIsRecalculated();
  });
});
