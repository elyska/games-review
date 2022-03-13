
/* reviews.test.js */

import { assertEquals, assert, assertExists, fail } from 'https://deno.land/std@0.79.0/testing/asserts.ts'

import { addReview, allReviews } from '../modules/reviews.js'

Deno.test({
  name: "add new review",
  async fn(test) {
    
    await test.step("add a valid review", async () => {
        const data = {
            rating: 4,
            review: "Good game!",
            username: "user1",
            creationDate: new Date('2022-03-12T18:08:11.000Z'),
            gameId: 1
        }
        const username = "doej"
        const returned = await addReview(data, username)
        assert(returned, "failed to add a new review")
    })

    await test.step("add an ivalid review", async () => {
        const data = {
            rating: "4",
            review: 123,
            username: "user1",
            creationDate: new Date('2022-03-12T18:08:11.000Z'),
            gameId: 1
        }
        const username = "doej"

        try {
            await addReview(data, username)
            fail("failed to throw an exception")
        }
        catch (err) {
            assertEquals(err.message, "invalid review data")
        }
    })

  },
  sanitizeResources: false,
  sanitizeOps: false
})

Deno.test({
  name: "get all reviews of a game",
  async fn() {
    const reviews = await allReviews(1)
    console.log(reviews)
    assertExists(reviews, "returned null or undefined")
  },
  sanitizeResources: false,
  sanitizeOps: false
})