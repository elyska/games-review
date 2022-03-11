
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
        return [{}]
    }
}

const db = new Db()

export { db }