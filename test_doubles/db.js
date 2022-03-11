
/* db.stub.js */

/** Class representing a test double for the database. 
 *  @class
*/
class Db {
    constructor() {}

    /**
     * @param {string} sql
     * @return {boolean}
     */
    query(sql) {
        console.log(sql)
        return true
    }
}

const db = new Db()

export { db }