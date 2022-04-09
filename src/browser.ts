import { app } from 'electron';
import puppeteerVanilla, { Browser, Page } from 'puppeteer-core';
import { BrowserOptions } from '../../types';

import { addExtra } from 'puppeteer-extra';

import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import ChromeAppePlugin from 'puppeteer-extra-plugin-stealth/evasions/chrome.app';
import DefaultArgsPlugin from 'puppeteer-extra-plugin-stealth/evasions/defaultArgs';
import ChromeRuntimePlugin from 'puppeteer-extra-plugin-stealth/evasions/chrome.runtime';
import ChromeCsiPlugin from 'puppeteer-extra-plugin-stealth/evasions/chrome.csi';
import ChromeLoadTimePlugin from 'puppeteer-extra-plugin-stealth/evasions/chrome.loadTimes';
import IFrameContentWindowPlugin from 'puppeteer-extra-plugin-stealth/evasions/iframe.contentWindow';
import MediaCodecsPlugin from 'puppeteer-extra-plugin-stealth/evasions/media.codecs';
import NavigatorHardwarePlugin from 'puppeteer-extra-plugin-stealth/evasions/navigator.hardwareConcurrency';
import NavigatorLanguagesPlugin from 'puppeteer-extra-plugin-stealth/evasions/navigator.languages';
import NavigatorPermissionsPlugin from 'puppeteer-extra-plugin-stealth/evasions/navigator.permissions';
import NavigatorPlugins from 'puppeteer-extra-plugin-stealth/evasions/navigator.plugins';
import WebdriverPlugin from 'puppeteer-extra-plugin-stealth/evasions/navigator.webdriver';
import UserAgentPlugin from 'puppeteer-extra-plugin-stealth/evasions/user-agent-override';
import SourceUrlPlugin from 'puppeteer-extra-plugin-stealth/evasions/sourceurl';
import WebglVendorPlugin from 'puppeteer-extra-plugin-stealth/evasions/webgl.vendor';
import WindowOuterDimensionsPlugin from 'puppeteer-extra-plugin-stealth/evasions/window.outerdimensions';
import PuppeteerUserPreferencePlpugin from 'puppeteer-extra-plugin-user-preferences';
import PuppeteerUserDataDirPlugin from 'puppeteer-extra-plugin-user-data-dir';

//puppeteer.use(StealthPlugin())

export default class BotBrowserService {
  browserOptions: BrowserOptions;
  browser: Browser;
  page: Page;
  logs: [];
  executablePath: string;

  constructor(options: BrowserOptions) {
    this.browserOptions = options;
    //this.userAgent = options.userAgent ? options.userAgent : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36';
    //this.pdfPath = './pdf'
    this.browser = null;
  }


  async openBrowser() {
    const puppeteer = addExtra(puppeteerVanilla)
    const plugins = [
      StealthPlugin(),
      DefaultArgsPlugin(),
      ChromeAppePlugin(),
      ChromeRuntimePlugin(),
      ChromeLoadTimePlugin(),
      NavigatorHardwarePlugin(),
      ChromeCsiPlugin(),
      IFrameContentWindowPlugin(),
      MediaCodecsPlugin(),
      NavigatorLanguagesPlugin(),
      NavigatorPermissionsPlugin(),
      NavigatorPlugins(),
      SourceUrlPlugin(),
      WebdriverPlugin(),
      UserAgentPlugin(),
      WebglVendorPlugin(),
      WindowOuterDimensionsPlugin(),
      PuppeteerUserPreferencePlpugin(),
      PuppeteerUserDataDirPlugin()
    ];

    try {
      console.log(StealthPlugin().availableEvasions)

      for (const plugin of plugins) {
        puppeteer.use(plugin);
      }

      this.browser = await puppeteer.launch({
        executablePath: this.executablePath,
        //executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // for mac os User
        //executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        headless: this.browserOptions.headless ? this.browserOptions.headless : false,
        ignoreDefaultArgs: ['--enable-automation'],
        userDataDir: app.getAppPath() + `/userData/${this.browserOptions.account._id}`,
        args: [
          //'--disable-gpu',
          '--window-position=0,0',
          '--disable-infobars',
          "--no-sandbox",
          '--disable-setuid-sandbox',
          '--disable-site-isolation-trials',
        ],
        ignoreHTTPSErrors: true,
      })

      const [page] = await this.browser.pages()

      await page.setBypassCSP(true)
      page.setDefaultNavigationTimeout(0)
      page.setDefaultTimeout(0)
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36 Edg/100.0.1185.29')
      this.page = page;
      return Promise.resolve({ browser: this.browser, page })
    } catch (err) {
      console.log(err);
      //this.browser.close();
      return Promise.reject(err)
    }

  }

}