const mysql = require('mysql')
const config = require('../configs/global')
const conn = mysql.createConnection({
    host : config.mysql.host,
    user : config.mysql.user,
    password : config.mysql.password,
    database : config.mysql.database
})

module.exports = conn