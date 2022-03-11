
/* db.js */

/** Class representing a test double for the database. 
 *  @class
*/
class Db {
    constructor() {}

    query(sql) {
        console.log(sql)

        if (sql.includes('INSERT INTO games')) {
          return true
        }
        else if (sql.includes('SELECT count(id) AS count FROM accounts WHERE user="doej"')) {
            const record = [ {count: 1} ]
            return record
        }
        else if (sql.includes('SELECT pass FROM accounts WHERE user = "doej"')) {
            const record = [ {pass: "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO"} ]
            return record
        }
        else if (sql.includes('INSERT INTO accounts')) {
            return true
        }
        else if (sql.includes('SELECT * FROM games WHERE id = 1')) {
            const game = {
                id: 1,
                name: "Space Invaders",
                publisher: "Atari, Inc.",
                year: "1981",
                description: "Space Invaders is a fixed shooter.",
                image: "images/placeholder.png",
                creationDate: new Date('2022-03-11T18:08:11.000Z'),
                username: "doej"
            }
            return [game]
        }
        return [{}]
    }
}

const db = new Db()

export { db }