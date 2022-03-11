
/* games.js */

/**
 * Games Module.
 * @module games
 */

import { db } from "database"
import Ajv from '../ajv.js'

/**
 * An object containing game details
 * @typedef {Object} Game
 * @property {string} name - name of the game
 * @property {string} publisher - publisher of the game
 * @property {string} year - year of release
 * @property {string} description - multiline description of the game
 * @property {string} image - data URL or path to a placeholder image
 */

/**
 * Saves game data in the database
 * @param {Game} data
 * @param {string} username
 * @returns {boolean}
 * @throws Will throw an error if the data validation fails.
 */

export async function addGame(data, username) {
    // data validation
    const schema = {
        title: "Add Game",
        desription: "JSON schema for validation of game data",
        type: "object",
        properties: {
            name: {
                type: "string",
                maxLength: 60,
                minLength: 1
            },
            publisher: {
                type: "string",
                maxLength: 60,
                minLength: 1
            },
            year: {
                type: "string",
                maxLength: 4
            },
            description: {
                type: "string",
                minLength: 1
            },
            image: {
                type: "string"
            }
        }
    }

    const ajv = new Ajv({ allErrors: true })
    const validate = ajv.compile(schema)

    const valid = validate(data)
    if (valid === false) {
        console.log(validate.errors)
        throw new Error("invalid game data")
    }

    const sql = `INSERT INTO games(name, publisher, year, description, image, username) VALUES("${data.name}", "${data.publisher}", "${data.year}", "${data.description}", "${data.image}", "${username}");`

    await db.query(sql)
  
    return true
}

/**
 * Gets all games from the database
 * @returns {Array.<Object>} games
 */
export async function allGames() {
    const sql = `SELECT id, name, year, image FROM games;`
    const games = await db.query(sql)
    return games
}

export async function getGame(id) {
    
}