
/* accounts.js */

/**
 * Accounts Module.
 * @module accounts
 */

import { compare, genSalt, hash } from 'https://deno.land/x/bcrypt@v0.2.4/mod.ts'

import { db } from './db.js'

const saltRounds = 10
const salt = await genSalt(saltRounds)

// adapted from https://jsdoc.app/tags-typedef.html
/**
 * An object containing user credentials
 * @typedef {Object} Credentials
 * @property {string} username
 * @property {string} password
 */

/**
 * Checks user credentials.
 * @param {Credentials} data
 * @returns {string} the username for the valid account
 */
export async function login(data) {
	console.log(data)
	let sql = `SELECT count(id) AS count FROM accounts WHERE user="${data.username}";`
	let records = await db.query(sql)
	if(!records[0].count) throw new Error(`username "${data.username}" not found`)
	sql = `SELECT pass FROM accounts WHERE user = "${data.username}";`
	records = await db.query(sql)
	const valid = await compare(data.password, records[0].pass)
	if(valid === false) throw new Error(`invalid password for account "${data.username}"`)
	return data.username
}

/**
 * Adds user credentials to the database
 * @param {Credentials} data
 * @returns {boolean}
 */
export async function register(data) {
	const password = await hash(data.password, salt)
	const sql = `INSERT INTO accounts(user, pass) VALUES("${data.username}", "${password}")`
	console.log(sql)
	await db.query(sql)
	return true
}
