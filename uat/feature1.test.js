
/* feature1.test.js */

import puppeteer from 'https://deno.land/x/puppeteer@9.0.2/mod.ts'
import { assertEquals, assertNotEquals } from 'https://deno.land/std@0.79.0/testing/asserts.ts'

const url = 'https://photo-tempo-8080.codio-box.uk/'

// FEATURE: Adding a New game
//      As a user
//      I want to see Add game button on the homepage
//      So that I can add new game details

// SCENARIO: Logged in user accessing the Add Game form page
Deno.test('logged in user accessing the Add Game form page     ', async () => {
    // GIVEN I am logged in
            const args = [`--window-size=${1000},${800}`]
            const browser = await puppeteer.launch({ headless: true, args })
            //const browser = await puppeteer.launch({ headless: false, slowMo: 50, args  })
            const page = await browser.newPage()
            await page.setViewport({ width: 1000, height: 800 })
            await page.goto(url + 'login', { waitUntil: 'networkidle0' })
            await page.type('input[name="username"]', 'doej')
            await page.type('input[name="password"]', 'p455w0rd')
            await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
    // AND I am on the Home page
            await page.goto(url, { waitUntil: 'networkidle0' })
    // WHEN I click the "Add Game" button
            //await page.click('nav figure:nth-child(2)', { waitUntil: 'networkidle0' }) // menu icon on small screens
            await page.screenshot({ path: './screenshot.png' })
            await page.click('a[href="/add-game"]', { waitUntil: 'networkidle0' })
    // THEN I should see a "name" field
            const name = await page.$eval('input[name="name"]', node => node.offsetParent)
            await assertNotEquals(name, null, 'name field not found')
    // AND I should see a "publisher" field
            const publisher = await page.$eval('input[name="publisher"]', node => node.offsetParent)
            await assertNotEquals(publisher, null, 'publisher field not found')
    // AND I should see a "year" slider input
            const year = await page.$eval('input[name="year"]', node => node.offsetParent)
            await assertNotEquals(year, null, 'year field not found')
    // AND I should see a "description" textbox
            const description = await page.$eval('textarea[name="description"]', node => node.offsetParent)
            await assertNotEquals(description, null, 'description field not found')
    // AND I should see an "image" file input
            const upload = await page.$eval('input[name="image"]', node => node.offsetParent)
            await assertNotEquals(upload, null, 'upload field not found')
            await browser.close()
})

// SCENARIO: Accessing the Add Game form page without logging in
Deno.test('Accessing the Add Game form page without logging in     ', async () => {
    // GIVEN I am not logged in
            const args = [`--window-size=${1000},${800}`]
            const browser = await puppeteer.launch({ headless: true, args })
            //const browser = await puppeteer.launch({ headless: false, slowMo: 50, args  })
            const page = await browser.newPage()
            await page.setViewport({ width: 1000, height: 800 })
            await page.goto(url + 'logout', { waitUntil: 'networkidle0' })
    // AND I browse to /add-game
            await page.goto(url + 'add-game', { waitUntil: 'networkidle0' })
    // THEN I should be redirected to the "Home" page
            await assertEquals(page.url(), url, 'not on the homepage')
    // BUT I should not see the "Add game" button
           // await page.click('nav figure:nth-child(2)', { waitUntil: 'networkidle0' }) // menu icon on small screens
            const button = await page.$('a[href="/add-game"]')
            await assertEquals(button, null, 'Add Game button is visible for an unlogged user')
            await browser.close()
})

// SCENARIO: Adding a new game
Deno.test('Adding a new game     ', async () => {
    // GIVEN I am logged in
            const args = [`--window-size=${1000},${800}`]
            const browser = await puppeteer.launch({ headless: true, args })
            //const browser = await puppeteer.launch({ headless: false, slowMo: 50, args  })
            const page = await browser.newPage()
            await page.setViewport({ width: 1000, height: 800 })
            await page.goto(url + 'login', { waitUntil: 'networkidle0' })
            await page.type('input[name="username"]', 'doej')
            await page.type('input[name="password"]', 'p455w0rd')
            await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
    // AND I am on the "Add Game" form page
            await page.goto(url + 'add-game', { waitUntil: 'networkidle0' })
    // WHEN I fill in "name" with "Space Invaders"
            await page.type('input[name="name"]', 'Space Invaders')
    // AND I fill in "publisher" with "Atari, Inc."
            await page.type('input[name="publisher"]', 'Atari, Inc.')
    // AND I select "1981" from "year"
            await page.keyboard.press('Tab')
            const date = new Date()
            const currentYear = date.getFullYear()
            const selectedYear = 1980 + Math.round((currentYear - 1980)/2)
            const clicks = selectedYear - 1981
            let storedPromises = []
            for (let i = 0; i < clicks; i++) storedPromises += page.keyboard.press('ArrowLeft')
            await Promise.all(storedPromises)
    // AND I fill in "description" with "Space Invaders is a fixed shooter in which the player moves a laser cannon horizontally across the bottom of the screen and fires at aliens overhead."
            await page.type('textarea[name="description"]', 'Space Invaders is a fixed shooter in which the player moves a laser cannon horizontally across the bottom of the screen and fires at aliens overhead.')
    // AND I click the "Submit" button
            await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
    // THEN I should be redirected to the "Home" page
            await assertEquals(page.url(), url, 'not on the homepage')
            await browser.close()
})

// SCENARIO: Submitting the game form with missing data
Deno.test('Submitting the game form with missing data     ', async () => {
    // GIVEN I am logged in
            const args = [`--window-size=${1000},${800}`]
            const browser = await puppeteer.launch({ headless: true, args })
            //const browser = await puppeteer.launch({ headless: false, slowMo: 50, args  })
            const page = await browser.newPage()
            await page.setViewport({ width: 1000, height: 800 })
            await page.goto(url + 'login', { waitUntil: 'networkidle0' })
            await page.type('input[name="username"]', 'doej')
            await page.type('input[name="password"]', 'p455w0rd')
            await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
    // AND I am on the "Add Game" form page
            await page.goto(url + 'add-game', { waitUntil: 'networkidle0' })
    // WHEN I fill in "name" with "Space Invaders"
            await page.type('input[name="name"]', 'Space Invaders')
    // AND I select "1981" from "year"
            await page.keyboard.press('Tab')
            await page.keyboard.press('Tab')
            const date = new Date()
            const currentYear = date.getFullYear()
            const selectedYear = 1980 + Math.round((currentYear - 1980)/2)
            const clicks = selectedYear - 1981
            let storedPromises = []
            for (let i = 0; i < clicks; i++) storedPromises += page.keyboard.press('ArrowLeft')
            await Promise.all(storedPromises)
    // AND I fill in "description" with "Space Invaders is a fixed shooter."
            await page.type('textarea[name="description"]', 'Space Invaders is a fixed shooter.')
    // AND I click the "Submit" button
            await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
    // THEN I see the browser url contains "/add-game"
            await assertEquals(page.url(), url + "add-game", 'not on the form page')
            await browser.close()
})

// SCENARIO: Exceeding the maximum length of 60 in an input field
Deno.test('Exceeding the maximum length of 60 in an input field     ', async () => {
    // GIVEN I am logged in
            const args = [`--window-size=${1000},${800}`]
            const browser = await puppeteer.launch({ headless: true, args })
            //const browser = await puppeteer.launch({ headless: false, slowMo: 50, args  })
            const page = await browser.newPage()
            await page.setViewport({ width: 1000, height: 800 })
            await page.goto(url + 'login', { waitUntil: 'networkidle0' })
            await page.type('input[name="username"]', 'doej')
            await page.type('input[name="password"]', 'p455w0rd')
            await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
    // AND I am on the "Add Game" form page
            await page.goto(url + 'add-game', { waitUntil: 'networkidle0' })
    // WHEN I fill in "name" with "a" 61 times
            const desiredName = 'a'.repeat(61)
            await page.type('input[name="name"]', desiredName)
    // THEN I should see "a" 60 times in the "name" field
            const actualName = await page.$eval('input[name="name"]', node => node.value)
            await assertEquals(actualName.length, 60, 'name is not 60 characters long')
            await browser.close()
})