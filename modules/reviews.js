/* reviews.js */

/**
 * Games Module.
 * @module reviews
 */

import { db } from "database"
import Ajv from '../ajv.js'

/**
 * Saves a review in the database
 * @param {Object} data
 * @param {string} username
 * @returns {boolean}
 * @throws Will throw an error if the data validation fails.
 */
export async function addReview(data, username) {
    // data validation
    const schema = {
        title: "Add Review",
        desription: "JSON schema for validation of review data",
        type: "object",
        properties: {
            rating: {
                type: "number",
                max: 5,
                min: 0
            },
            review: {
                type: "string"
            },
            productId: {
                type: "number"
            }
        }
    }

    const ajv = new Ajv({ allErrors: true })
    const validate = ajv.compile(schema)

    const valid = validate(data)
    if (valid === false) {
        console.log(validate.errors)
        throw new Error("invalid review data")
    }

    const sql = `INSERT INTO reviews(rating, review, username, productId) VALUES(${data.rating}, "${data.review}", "${username}", ${data.productId});`

    await db.query(sql)

    return true
}