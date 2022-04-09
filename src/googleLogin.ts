'use strict';
import BotBrowserService from "./browser";

export default class BotGoogleLogin {

  browser: BotBrowserService;
  loginEndpoint: string = 'https://accounts.google.com/signin/v2/identifier';
  successEndpoint: string = 'myaccount.google.com';

  constructor(browser: BotBrowserService) {
    this.browser = browser;
  }

  async login() {
    try {
      const isLoggedIn = await this.checkLogin();
      console.log('called Login Funct');
      if (isLoggedIn) {
        console.log('User Already Logged In');
        return true;
      }
      console.log('User Trying to login');
      return await this.doLogin();
    } catch (err) {
      throw new Error(`Login Failed`)
    }
  }

  async doLogin() {

    console.log(this.browser.page.url());

    const loginPage = this.browser.page.url().includes(this.loginEndpoint);

    //if stuck in login page, maybe email or password is wrong
    if (loginPage) {
      console.log('1');
      await this.browser.page.waitForSelector('#identifierId', { visible: true })
      console.log('2');
      await this.browser.page.type('#identifierId', this.browser.browserOptions.account.email, { delay: 0 })
      console.log('3');
      await this.browser.page.keyboard.press('Enter')
      // await page.waitForTimeout(1000);

      await this.browser.page.waitForSelector('#password input[type="password"]', { visible: true })
      await this.browser.page.type('#password input[type="password"]', this.browser.browserOptions.account.password, { delay: 0 })
      // await newPage.click('#passwordNext');
      await this.browser.page.keyboard.press('Enter')
      await this.browser.page.waitForTimeout(1000)
      await this.browser.page.waitForNavigation()
    }

    // else we wait until my account page shows
    await this.browser.page.waitForRequest(request => {
      return request.url().includes(this.successEndpoint)
    })

    return Promise.resolve(this.browser.page)
  }

  async checkLogin() {
    await this.browser.page.goto(this.loginEndpoint, { waitUntil: 'networkidle2', timeout: 0 })
    let isLoggedIn = this.browser.page.url().includes(this.successEndpoint);

    return isLoggedIn;
  }

}