
/* games.js */

import { db } from "../modules/db.js"
import Ajv from '../ajv.js'

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