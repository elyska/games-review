/* feature4.test.js */

import puppeteer from 'https://deno.land/x/puppeteer@9.0.2/mod.ts'
import { assertEquals } from 'https://deno.land/std@0.79.0/testing/asserts.ts'

const url = 'https://photo-tempo-8080.codio-box.uk/'

// FEATURE: Adding reviews
//     As a user
//     I want to be able to add a game's review
//     so that other people can see my opinion on the game

// SCENARIO: Review Pac-Man
Deno.test('Review Pac-Man     ', async () => {
    // GIVEN I am logged in as "user2"
            const args = [`--window-size=${1000},${800}`]
            //const browser = await puppeteer.launch({ headless: true, args })
            const browser = await puppeteer.launch({ headless: false, slowMo: 50, args  })
            const page = await browser.newPage()
            await page.setViewport({ width: 1000, height: 800 })
            await page.goto(url + 'login', { waitUntil: 'networkidle0' })
            await page.type('input[name="username"]', 'user2')
            await page.type('input[name="password"]', 'p455w0rd')
            await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
    // AND I am on the "Pac-Man" details page
            await page.goto(url + 'games/2', { waitUntil: 'networkidle0' })
    // WHEN I select "5" from "rating"
            await page.click('input[type="range"]', { waitUntil: 'networkidle0' })
            const max = 5
            const min = 0
            const currentRating = min + Math.round((max - min)/2)
            const clicks = 5 - currentRating
            let storedPromises = []
            for (let i = 0; i < clicks; i++) storedPromises += page.keyboard.press('ArrowRight')
            await Promise.all(storedPromises)
    // AND I fill in "review" with "Fun game"
            await page.type('textarea[name="review"]', 'Fun game')
    // AND I click "Submit" button
            await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
    // THEN I should be on the "Pac-Man" details page
            await assertEquals(page.url(), url + 'games/2', 'not on the "Pac-Man" details page')
    // AND I should see "user2" text
            const user = await page.$$eval('main p', nodes => {
                for (const node of nodes) if (node.innerText === "user2") return node.innerText
            })
            await assertEquals(user, 'user2', 'no "user2" text')
    // AND I should see "Rating: 5" text
            const rating = await page.$$eval('main p', nodes => {
                for (const node of nodes) if (node.innerText === "Rating: 5") return node.innerText
            })
            await assertEquals(rating, 'Rating: 5', 'no "Rating: 5" text')
    // AND I should see "Fun game" text
            const review = await page.$$eval('main p', nodes => {
                for (const node of nodes) if (node.innerText === "Fun game") return node.innerText
            })
            await assertEquals(review, 'Fun game', 'no "Rating: 5" text')
            await browser.close()
})