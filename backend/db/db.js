const sqlite3 = require('sqlite3').verbose()

const createDb = (dbFile) => {
  let db = null

  db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
      console.error(err.message)
    }
    console.log(`Successful connection to the database`)
  })

  db.q = (query, params = []) => {
    const p = new Promise((resolve, reject) => {
      return db.all(query, params, (err, rows) => {
        if (err) {
          console.error(err.message)
          reject(err)
        }
        resolve(rows)
      })
    })

    return p
  }

  return db
}

module.exports = {
  createDb
}
