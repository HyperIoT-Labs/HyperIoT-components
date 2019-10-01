import { browser, by, element } from 'protractor';

export class ButtonsPage {

    private defaultBtn = element(by.className('mat-raised-button mat-button-base'));
    private primaryBtn = element(by.className('mat-raised-button mat-button-base mat-primary'));
    private accentBtn = element(by.className('mat-raised-button mat-button-base mat-accent'));
    private warnBtn = element(by.className('mat-raised-button mat-button-base mat-warn'));
    private buttonArea = element(by.xpath(''));

    getDefaultButton() {
        return this.defaultBtn;
    }

    getPrimaryButton() {
        return this.primaryBtn;
    }

    getAccentBtn() {
        return this.accentBtn;
    }

    getWarnBtn() {
        return this.warnBtn;
    }

    navigateTo() {
        browser.get('/buttons');
    }




}