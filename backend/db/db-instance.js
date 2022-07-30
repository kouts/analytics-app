const { createDb } = require('./db')
const path = require('path')

const db = createDb(path.resolve('./backend/sqlite/sqlite.db'))

module.exports = {
  db
}
