
/* db.test.js */

import { assertEquals } from 'https://deno.land/std@0.79.0/testing/asserts.ts'

import { db } from '../modules/db.js'

Deno.test({
    name: "database test",
    async fn(test) {

        await test.step('insert user', async () => {
            let sql = 'INSERT INTO accounts (user, pass) VALUES ("username", "password");'
            const returned = await db.query(sql)
            const id = returned.lastInsertId

            sql = `SELECT * FROM accounts WHERE id = ${id}`
            const insertedUser = await db.query(sql)
    
            assertEquals(insertedUser[0].user, "username", "wrong user")
            assertEquals(insertedUser[0].pass, "password", "wrong password")
        })

        db.close()
    },
    sanitizeResources: false,
    sanitizeOps: false
})
