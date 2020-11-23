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

async function isFoundElement(elementIdString) {
    try {
        await driver.findElement(By.id(elementIdString))
        console.log("[***DEBUG***] Should Not be found: (" + elementIdString + ")")
        return true
    } catch {
        return false
    }
}

async function isFoundElementClass(elementIdString) {
    try {
        await driver.findElement(By.className(elementIdString))
        console.log("[***DEBUG***] Should Not be found: (" + elementIdString + ")")
        return true
    } catch {
        return false
    }
}

//.setChromeOptions(new chrome.Options().headless())
let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless())
    .build();

describe('Website Up ', function () {

    it("Website Up and Running", async () => {
        try {
            await driver.get(process.env.DEMOURL);
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
        //let elements = await driver.getPageSource()
        //let elements = await driver.getPageSource()
        //console.log(elements);
        // await driver.wait(until.elementLocated(By.className("ds-c-button")), 3000);
        let buttons = await driver.findElements(By.className("ds-c-button"))
        buttons[1].click()
       // await driver.wait(until.elementLocated(By.className("ds-c-button")), 3000)
        await driver.wait(until.elementLocated(By.id("email")), 3000)
    });

    it("Login Test User", async () => {
        //let elements = await driver.getPageSource()

        await driver.wait(until.elementLocated(By.id("email")), 3000).sendKeys(process.env.DEMOUSER);
        await driver.wait(until.elementLocated(By.id("password")), 3000).sendKeys(process.env.DEMOPASS);
        await driver.wait(until.elementLocated(By.id("password")), 3000).sendKeys(Key.TAB);
        await driver.switchTo().activeElement().sendKeys(Key.ENTER)

    })

})

describe('Check Spa Upload Limit ', function () {

    it("SPA Form Upload Error Message", async () => {

        let buttons = await driver.wait(until.elementsLocated(By.className("action-title")), 10000)
        buttons = await driver.wait(until.elementsLocated(By.className("ds-c-button")), 10000)

        console.log(buttons.length);
        await buttons[2].click();
        let form1 = await driver.wait(until.elementLocated(By.id("uploader-input-0")), 2000)
    })

})

describe('Upload Limit Error ', function () {

    it("SPA Form Upload Error Message", async () => {

        await driver.wait(until.elementLocated(By.id("uploader-input-0")), 3000).sendKeys("/Users/zachlewis/Desktop/toobig.zip")
        await driver.wait(until.elementLocated(By.className("ds-c-alert__text")), 3000)
    })

})

describe('Upload Limit No Error ', function () {

    it("SPA Form Upload NO Error Message", async () => {

        await driver.wait(until.elementLocated(By.id("uploader-input-0")), 3000).sendKeys("/Users/zachlewis/Desktop/foo")
        const found = await isFoundElementClass("ds-c-alert__text")
        console.log("[***DEBUG***] " + found)
        if (found) {
            assert.fail()
        }
    })

})


after(function () {
    driver.close();
})

