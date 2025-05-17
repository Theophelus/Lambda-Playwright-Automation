import { test } from "../fixtures/PageFixture";

test.describe(`Cart Page - Registered Customer`, () => {
  test(`Verify the cart displays empty message`, async ({homePage,loginPage,cartPage,}) => {
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
    await cartPage.verifyEmptyMessage("Your shopping cart is empty!")
  });
});
