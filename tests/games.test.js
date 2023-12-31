
/* games.test.js */

import { assertEquals, assert, assertExists, fail } from 'https://deno.land/std@0.79.0/testing/asserts.ts'

import { addGame, allGames, getGame } from '../modules/games.js'

// code based on https://deno.land/manual@v1.19.2/testing/sanitizers
Deno.test({
  name: "add new game",
  async fn(test) {
    
    await test.step("add a valid game", async () => {
        const data = {
            name: "game name",
            publisher: "publisher",
            year: "2005",
            description: "game description",
            image: "images/placeholder.png"
        }
        const username = "doej"
        const returned = await addGame(data, username)
        assert(returned, "failed to add a new game")
    })

    await test.step("throws exception if the datatype is incorrect", async () => {
        const data = {
            name: 5,
            publisher: "publisher",
            year: "2005",
            description: "game description",
            image: "images/placeholder.png"
        }
        const username = "doej"

        try {
            await addGame(data, username)
            fail("failed to throw an exception")
        }
        catch (err) {
            assertEquals(err.message, "invalid game data")
        }
    })

    await test.step("throws exception if the length is incorrect", async () => {
        const data = {
            name: "game name",
            publisher: "",
            year: "2005",
            description: "game description",
            image: "images/placeholder.png"
        }
        const username = "doej"

        try {
            await addGame(data, username)
            fail("failed to throw an exception")
        }
        catch (err) {
            assertEquals(err.message, "invalid game data")
        }
    })
  },
  sanitizeResources: false,
  sanitizeOps: false
})

Deno.test({
  name: "get all games",
  async fn() {
    const games = await allGames()
    assertExists(games, "returned null or undefined")
  },
  sanitizeResources: false,
  sanitizeOps: false
})

Deno.test({
  name: "get a specific game",
  async fn(test) {

    await test.step("valid id", async () => {
      const expectedGame = {
        id: 1,
        name: "Chrome Dino",
        publisher: "Google",
        year: "2014",
        description: "The player guides a pixelated Tyrannosaurus rex across a side-scrolling landscape, avoiding obstacles to achieve a higher score.",
        image: "images/placeholder.png",
        creationDate: new Date('2022-03-11T18:08:11.000Z'),
        username: "doej"
      }
      const game = await getGame(1)
      assertEquals(game, expectedGame, "invalid game details")
    })

    await test.step("invalid id", async () => {
      try {
        await getGame("x")
        fail("failed to throw an exception")
      }
      catch (err) {
        assertEquals(err.message, 'game with id "x" not found')
      }
    })
  },
  sanitizeResources: false,
  sanitizeOps: false
})