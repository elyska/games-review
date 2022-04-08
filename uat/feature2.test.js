
/* feature2.test.js */

import puppeteer from 'https://deno.land/x/puppeteer@9.0.2/mod.ts'
import { assertEquals, assertArrayIncludes } from 'https://deno.land/std@0.79.0/testing/asserts.ts'

const url = 'https://photo-tempo-8080.codio-box.uk/'

//FEATURE: Viewing all games
//     As a user
//     I want to be able to see all games
//     so that I can read their name and release year

// SCENARIO: Added game appears on the home page
Deno.test('Added game appears on the home page     ', async () => {
    // GIVEN I am logged in
            const args = [`--window-size=${1000},${700}`]
            //const browser = await puppeteer.launch({ headless: true, args })
            const browser = await puppeteer.launch({ headless: false, slowMo: 50, args  })
            const page = await browser.newPage()
            await page.setViewport({ width: 1000, height: 800 })
            await page.goto(url + 'login', { waitUntil: 'networkidle0' })
            await page.type('input[name="username"]', 'doej')
            await page.type('input[name="password"]', 'p455w0rd')
            await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
            await page.click('form[action="/accept-cookies"] button', { waitUntil: 'networkidle0' })
    // AND I am on the "Add Game" form page
            await page.goto(url + 'add-game', { waitUntil: 'networkidle0' })
    // WHEN I fill in "name" with "New Game"
            await page.type('input[name="name"]', 'New Game')
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
    // AND I fill in "description" with "Game *description*"
            await page.type('textarea[name="description"]', 'Game *description*')
    // AND I click the "Submit" button
            await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
    // THEN I should be redirected to the "Home" page
            await assertEquals(page.url(), url, 'not on the homepage')
    // AND I should see a "New Game" heading
            const names = await page.$$eval('h1', nodes => {
                const names = []
                for (const node of nodes) names.push(node.innerText)
                return names
            })
            await assertArrayIncludes(names, ["New Game"], "game name not displayed on the homepage")
            await page.waitForTimeout(5000)
            await browser.close()
})