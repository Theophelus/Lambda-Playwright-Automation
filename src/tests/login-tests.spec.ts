import { test, expect } from "../fixtures/PageFixture";
import { AccountPage } from "../pages/AccountPage";

test("Login in into Lambda Ecommerce Play Pen as a Registered Customer", async ({
  homePage,
  loginPage,
}) => {
  //initiator
  await homePage.navigate();
  await loginPage.hoverMyAccount();

  //action
  await loginPage.clickLoginAccountLink();

  //fill form
  await loginPage.fillInLoginForm()

  //click login button
  const accountPage = await loginPage.clickLoginBtn();

  //assertion
  await accountPage.expectedMyAccountTitleToBeVisible();
});
