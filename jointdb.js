const {Database} =  require('sqlite3')
const jointdb = new Database(':memory:')
module.exports = {jointdb}

