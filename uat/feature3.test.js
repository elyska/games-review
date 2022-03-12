
/* feature3.test.js */

import puppeteer from 'https://deno.land/x/puppeteer@9.0.2/mod.ts'
import { assertEquals } from 'https://deno.land/std@0.79.0/testing/asserts.ts'

const url = 'https://photo-tempo-8080.codio-box.uk/'

// FEATURE: Viewing game details
//     As a user
//     I want to be able to view game's details
//     to learn more about a game

// SCENARIO: View Space Invaders datails page
Deno.test('View Space Invaders datails page     ', async () => {
    // GIVEN I am on the homepage
            const args = [`--window-size=${1000},${800}`]
            const browser = await puppeteer.launch({ headless: true, args })
            //const browser = await puppeteer.launch({ headless: false, slowMo: 50, args  })
            const page = await browser.newPage()
            await page.setViewport({ width: 1000, height: 800 })
            await page.goto(url, { waitUntil: 'networkidle0' })
    // WHEN I click "Details" button next to the "Space Invaders" heading
            await page.click('a[href="/games/1"]', { waitUntil: 'networkidle0' })
    // THEN I should see "Chrome Dino" heading
            const name = await page.$eval('h1', node => node.innerText)
            await assertEquals(name, "Chrome Dino", 'no "Chrome Dino" heading')
    // AND I should see "Google" text
            const publisher = await page.$eval('main p:nth-of-type(1)', node => node.innerText)
            await assertEquals(publisher, "Google", 'no matching publisher')
    // AND I should see "2014" text
            const year = await page.$eval('main p:nth-of-type(2)', node => node.innerText)
            await assertEquals(year, "2014", 'no matching year')
    // AND I should see "The player guides a pixelated Tyrannosaurus rex across a side-scrolling landscape, avoiding obstacles to achieve a higher score." text
            const desc = await page.$eval('main p:nth-of-type(3)', node => node.innerText)
            await assertEquals(desc, "The player guides a pixelated Tyrannosaurus rex across a side-scrolling landscape, avoiding obstacles to achieve a higher score.", 'no matching description')
    // AND I should see "doej" text
            const user = await page.$eval('main section:nth-of-type(2) p:nth-of-type(1)', node => node.innerText)
            await assertEquals(user, "doej", 'no matching username')
    // AND I should see "11/3/2022" text
            const date = await page.$eval('main section:nth-of-type(2) p:nth-of-type(3)', node => node.innerText)
            await assertEquals(date, "11/3/2022", 'no "11/3/2022" date')
            await browser.close()
})