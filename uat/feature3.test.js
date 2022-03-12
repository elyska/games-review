
/* feature3.test.js */

import puppeteer from 'https://deno.land/x/puppeteer@9.0.2/mod.ts'
import { assertEquals } from 'https://deno.land/std@0.79.0/testing/asserts.ts'

const url = 'https://photo-tempo-8080.codio-box.uk/'

// FEATURE: Viewing game details
//     As a user
//     I want to be able to view game's details
//     to learn more about a game

// SCENARIO: View Chrome Dino datails page
Deno.test('View Chrome Dino datails page     ', async () => {
    // GIVEN I am on the homepage
            const args = [`--window-size=${1000},${800}`]
            const browser = await puppeteer.launch({ headless: true, args })
            //const browser = await puppeteer.launch({ headless: false, slowMo: 50, args  })
            const page = await browser.newPage()
            await page.setViewport({ width: 1000, height: 800 })
            await page.goto(url, { waitUntil: 'networkidle0' })
    // WHEN I click "Details" button next to the "Chrome Dino" heading
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
            const desc = await page.$eval('main p:nth-of-type(4)', node => node.innerText)
            await assertEquals(desc, "The player guides a pixelated Tyrannosaurus rex across a side-scrolling landscape, avoiding obstacles to achieve a higher score.", 'no matching description')
    // AND I should see "doej" text
            const user = await page.$eval('main section:nth-of-type(2) p:nth-of-type(1)', node => node.innerText)
            await assertEquals(user, "doej", 'no matching username')
    // AND I should see "11/3/2022" text
            const date = await page.$eval('main section:nth-of-type(2) p:nth-of-type(3)', node => node.innerText)
            await assertEquals(date, "11/3/2022", 'no "11/3/2022" date')
            await browser.close()
})

// SCENARIO: Browse to invalid game
Deno.test('Browse to invalid game     ', async () => {
    // GIVEN I am on the "Home" page
            const args = [`--window-size=${1000},${800}`]
            const browser = await puppeteer.launch({ headless: true, args })
            //const browser = await puppeteer.launch({ headless: false, slowMo: 50, args  })
            const page = await browser.newPage()
            await page.setViewport({ width: 1000, height: 800 })
            await page.goto(url, { waitUntil: 'networkidle0' })
    // WHEN I browse to "/games/abc"
            await page.goto(url + "games/abc", { waitUntil: 'networkidle0' })
    // THEN I should see "404" heading
            const h1 = await page.$eval('main h1', node => node.innerText)
            await assertEquals(h1, "404", 'no "404" heading')
    // AND I should see "PAGE NOT FOUND" text
            const p = await page.$eval('main p', node => node.innerText)
            await assertEquals(p, "PAGE NOT FOUND", 'no "PAGE NOT FOUND" text')
            await browser.close()
})

// SCENARIO: Add and view a game with markdown formatting
Deno.test('Add and view a game with markdown formatting     ', async () => {
    // GIVEN I am logged in
            const args = [`--window-size=${1000},${800}`]
            const browser = await puppeteer.launch({ headless: true, args })
            //const browser = await puppeteer.launch({ headless: false, slowMo: 10, args  })
            const page = await browser.newPage()
            await page.setViewport({ width: 1000, height: 800 })
            await page.goto(url + 'login', { waitUntil: 'networkidle0' })
            await page.type('input[name="username"]', 'doej')
            await page.type('input[name="password"]', 'p455w0rd')
            await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
    // AND I am on the "Add Game" form page
            await page.goto(url + 'add-game', { waitUntil: 'networkidle0' })
    // WHEN I fill in "name" with "Microsoft Solitaire"
            await page.type('input[name="name"]', 'Microsoft Solitaire')
    // AND I fill in "publisher" with "Microsoft Casual Games"
            await page.type('input[name="publisher"]', 'Microsoft Casual Games')
    // AND I select "1990" from "year"
            await page.keyboard.press('Tab')
            const date = new Date()
            const currentYear = date.getFullYear()
            const selectedYear = 1980 + Math.round((currentYear - 1980)/2)
            const clicks = selectedYear - 1990
            let storedPromises = []
            for (let i = 0; i < clicks; i++) storedPromises += page.keyboard.press('ArrowLeft')
            await Promise.all(storedPromises)
    // AND I fill in "description" with "When a [game](https://en.wikipedia.org/wiki/Microsoft_Solitaire) is **won**, the cards appear to fall off each stack and *bounce off* the screen."
            await page.type('textarea[name="description"]', 'When a [game](https://en.wikipedia.org/wiki/Microsoft_Solitaire) is **won**, the cards appear to fall off each stack and *bounce off* the screen.')
    // AND I click the "Submit" button
            await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
    // AND I click "Details" button next to "Microsoft Solitaire" heading
            const href = await page.$$eval('main article section', nodes => {
                for (const node of nodes) if (node.children[0].innerText === "Microsoft Solitaire") return node.children[2].getAttribute("href")
            })
            await page.click(`a[href="${href}"]`, { waitUntil: 'networkidle0' })
    // THEN I should see a "https://en.wikipedia.org/wiki/Microsoft_Solitaire" link
            const a = await page.$eval('main a', node => node.href)
            await assertEquals(a, "https://en.wikipedia.org/wiki/Microsoft_Solitaire", 'link not found')
    // AND I should see "won" text in a strong element
            const b = await page.$eval('main strong', node => node.innerText)
            await assertEquals(b, "won", 'strong not found')
    // AND I should see "bounce off" text in an em element
            const i = await page.$eval('main em', node => node.innerText)
            await assertEquals(i, "bounce off", 'em not found')
            await browser.close()
})
