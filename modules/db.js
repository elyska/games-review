
/* db.js */

/**
 * Database Module.
 * @module db
 */

import { Client } from 'https://deno.land/x/mysql/mod.ts'

const home = Deno.env.get('HOME')
console.log(`HOME: ${home}`)

const connectionData = {
  '/home/codio':  {
    hostname: '127.0.0.1',
    username: 'websiteuser',
    password: 'websitepassword',
    db: 'website'
  },
  '/app': {
	hostname: 'sql11.freesqldatabase.com',
    username: 'sql11484064',
    password: 'LbVtgJnuQp',
    db: 'sql11484064'
  }
}

const conn = connectionData[home]
console.log(conn)

const db = await new Client().connect(conn)

export { db }
