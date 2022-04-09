
import BotGoogleLogin from './googleLogin';
import BotBrowserService from './browser';
import { Account } from './types';

const acc: Account = {
  _id: '_3242342',
  email: 'test@gmail.com',
  password: 'test',
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36 Edg/100.0.1185.29'
}
start(acc);

async function start(account: Account) {

  //const chromeExecutablePath: string = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'; // for mac os User
  const chromeExecutablePath: string = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'; //ffor windows user

  const browserOptions = {
    headless: false,
    account: account,

  }

  const browser = new BotBrowserService(browserOptions);
  browser.executablePath = chromeExecutablePath;

  await browser.openBrowser();

  const googleLogin = new BotGoogleLogin(browser);
  try {
    await googleLogin.login();
    console.log('login sukses');
    // const issuu = new IssuuBotService(browser, );
    // await issuu.run();
    //browser.browser.close();
  } catch (err) {
    console.log(err);
  } finally {
    browser.browser.close();
  }
}