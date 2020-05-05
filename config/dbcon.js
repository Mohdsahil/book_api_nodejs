const { createPool } = require('mysql')

const pool = createPool({
    host: "110.225.84.213",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

module.exports = pool