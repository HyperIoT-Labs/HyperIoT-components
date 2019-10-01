import { AppPage } from './app.po';
import { ButtonsPage } from "./page objects/buttons.po";
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;
  let buttonsPage: ButtonsPage;
   

  beforeEach(() => {
    page = new AppPage();
    buttonsPage = new ButtonsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('HyperIoT UI-Components Showcase');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('shoud go to the buttons section', () => {
    buttonsPage.navigateTo();
    expect(browser.getCurrentUrl()).toContain('/buttons');
    browser.sleep(1000);
  });

  it('shoud click on the buttons', () => {
    buttonsPage.getDefaultButton().click();
    browser.sleep(1000);
    buttonsPage.getPrimaryButton().click();
    browser.sleep(1000);
    buttonsPage.getAccentBtn().click();
    browser.sleep(1000);
    buttonsPage.getWarnBtn().click();
    browser.sleep(1000);
  });


});
