var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('chai').assert
var expect = require('chai').expect;
var should = require('chai').should;
var chrome = require('selenium-webdriver/chrome');
const {Builder, By, Key, until} = require('selenium-webdriver');

const waiverIdFormat = "The Waiver ID must be in the format of SS.##.R##.M## or SS.####.R##.## !"
const spaIdFormat = "The SPA ID must be in the format of SS-YY-NNNN or SS-YY-NNNN-xxxx !"

//.setChromeOptions(new chrome.Options().headless())
let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless())
    .build();

describe('Website Up ', function () {

    it("Website Up and Running", async () => {
        try {
            await driver.get('https://d3jjud0ztowjay.cloudfront.net');
            assert.ok("Site up")
        } catch {
            assert.fail("Web Failed")
        }
    })

    it("Title Found", async () => {
        const title = await driver.getTitle();
        if (title === "CMS SPA and Waiver Submission Form") {
            assert.ok("Web Up")
        } else {
            assert.fail("Title Changed")
        }
    })


    it("Show Login Page", async () => {
        let elements = await driver.getPageSource()
        //console.log(elements);
        await driver.wait(until.elementLocated(By.id("devloginBtn")), 3000).click();
        await driver.wait(until.elementLocated(By.id("email")), 3000)
    });

    it("Login Test User", async () => {
        //let elements = await driver.getPageSource()
        await driver.wait(until.elementLocated(By.id("email")), 3000).sendKeys(process.env.DEMOUSER);
        await driver.wait(until.elementLocated(By.id("password")), 3000).sendKeys(process.env.DEMOPASS);
        await driver.wait(until.elementLocated(By.id("loginDevUserBtn")), 3000).click();
        await driver.wait(until.elementLocated(By.id("spaSubmitBtn")), 3000).click();

    })

})

describe('Check Spa Error Message ', function () {

    it("SPA Form Error Message", async () => {
        await driver.wait(until.elementLocated(By.id("territory")), 3000).click()
        await driver.wait(until.elementLocated(By.id("territory")), 3000).sendKeys("A");
        await driver.wait(until.elementLocated(By.id("territory")), 3000).click()
        await driver.wait(until.elementLocated(By.id("transmittalNumber")), 3000).sendKeys("e")
        const errorstr = await driver.wait(until.elementLocated(By.id("spaTransmittalNumberErrorMsg")), 5000).getText()
        console.log("[***DEBUG***] " + errorstr)
        expect(errorstr).to.equal(spaIdFormat);

    })

})

describe('Check Spa RAI Transmittal Error Message  Check', function () {

    it("Spa RAI Form Error Message", async () => {
        await driver.wait(until.elementLocated(By.id("dashboardLink")), 3000).click();
        await driver.wait(until.elementLocated(By.id("spaRaiBtn")), 3000).click();
        await driver.wait(until.elementLocated(By.id("transmittalNumber")), 3000).sendKeys("e")
        const errorstr = await driver.wait(until.elementLocated(By.id("raiTransmittalNumError")), 5000).getText()
        console.log("[***DEBUG***] " + errorstr)
        expect(errorstr).to.equal(spaIdFormat);

    })

})


describe('Waiver Transmittal Error Message Check ', function () {

    it("Waiver Transmittal Error Form Error Message", async () => {
        await driver.wait(until.elementLocated(By.id("dashboardLink")), 3000).click()
        await driver.wait(until.elementLocated(By.id("waiverBtn")), 3000).click();
        await driver.wait(until.elementLocated(By.id("territory")), 3000).click()
        await driver.wait(until.elementLocated(By.id("territory")), 3000).sendKeys("A");
        await driver.wait(until.elementLocated(By.id("territory")), 3000).click()
        await driver.wait(until.elementLocated(By.id("transmittalNumber")), 3000).sendKeys("e")
        const errorstr = await driver.wait(until.elementLocated(By.id("waiverTransmittalError")), 5000).getText()
        console.log("[***DEBUG***] " + errorstr)
       // expect(errorstr).to.equal(waiverIdFormat);

    })

})

describe('Check Waiver RAI Transmittal Error Message  Check', function () {

    it("Waiver RAI Form Error Message", async () => {
        await driver.wait(until.elementLocated(By.id("dashboardLink")), 3000).click();
        await driver.wait(until.elementLocated(By.id("waiverRaiBtn")), 3000).click();
        await driver.wait(until.elementLocated(By.id("transmittalNumber")), 3000).sendKeys("e")
        const errorstr = await driver.wait(until.elementLocated(By.id("raiTransmittalNumError")), 5000).getText()
        console.log("[***DEBUG***] " + errorstr)
        expect(errorstr).to.equal(waiverIdFormat);

    })

})

describe('Check Waiver Extension Transmittal Error Message  Check', function () {

    it("Waiver Extension Form Error Message", async () => {
        await driver.wait(until.elementLocated(By.id("dashboardLink")), 3000).click();
        await driver.wait(until.elementLocated(By.id("waiverExtBtn")), 3000).click();
        await driver.wait(until.elementLocated(By.id("transmittalNumber")), 3000).sendKeys("e")
        const errorstr = await driver.wait(until.elementLocated(By.id("waiverExtTransmittalNumError")), 5000).getText()
        console.log("[***DEBUG***] " + errorstr)
        expect(errorstr).to.equal(waiverIdFormat);

    })

})

after(function() {
    driver.close();
})
