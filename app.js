const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const conn = require('./src/helpers/mysql')
const routes = require('./src/routes/index')
conn.connect( (error) => {
    if (error) throw error
    console.log('Database is Connected')
})

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/', routes)

app.listen(3000, (req, res) => {
    console.log('POS API running in http://localhost:3000')
})