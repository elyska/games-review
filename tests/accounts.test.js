
/* accounts.test.js */

import { assertEquals, assert, fail } from 'https://deno.land/std@0.79.0/testing/asserts.ts'

import { login, register } from '../modules/accounts.js'

Deno.test({
  name: "login test",
  async fn(test) {
    
    await test.step("valid user", async () => {
        const data = {
            username: "doej",
            password: "p455w0rd"
        }
        const username = await login(data)
        assertEquals(username, data.username, "username does not match")
    })

    await test.step("invalid user", async () => {
        const data = {
            username: "jdoe",
            password: "p455w0rd"
        }
        
        try {
            await login(data)
            fail("failed to throw an exception")
        }
        catch (err) {
            assertEquals(err.message, `username "${data.username}" not found`)
        }
    })

    await test.step("invalid password", async () => {
        const data = {
            username: "doej",
            password: "password"
        }
        
        try {
            await login(data)
            fail("failed to throw an exception")
        }
        catch (err) {
            assertEquals(err.message, `invalid password for account "${data.username}"`)
        }
    })

  },
  sanitizeResources: false,
  sanitizeOps: false
})

Deno.test({
  name: "register test",
  async fn(test) {
    
    await test.step("new registration", async () => {
        const data = {
            username: "doej",
            password: "p455w0rd"
        }
        const returned = await register(data)
        assertEquals(returned, true, "registration failed")
    })

  },
  sanitizeResources: false,
  sanitizeOps: false
})

/*
Deno.test("login test", async test => {
    await test.step("valid user", async () => {
        const data = {
            username: "doej",
            password: "p455w0rd"
        }
        const username = await login(data)
        assertEquals(username, data.username, "username does not match")
    })

    await test.step("invalid user", async () => {
        const data = {
            username: "jdoe",
            password: "p455w0rd"
        }
        
        try {
            await login(data)
            fail("failed to throw an exception")
        }
        catch (err) {
            assertEquals(err.message, `username "${data.username}" not found`)
        }
    })

    await test.step("invalid password", async () => {
        const data = {
            username: "doej",
            password: "password"
        }
        
        try {
            await login(data)
            fail("failed to throw an exception")
        }
        catch (err) {
            assertEquals(err.message, `invalid password for account "${data.username}"`)
        }
    })
})*/