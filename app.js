const express = require('express')
const app = express()
require('dotenv').config()

const bodyParser = require('body-parser')
const morgan = require('morgan')
const conn = require('./src/helpers/mysql')
const helper = require('./src/helpers/index')

conn.connect( (error) => {
    if (error) throw error
    console.log('Database is Connected')
})

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/products', (req,res) => {
    conn.query("SELECT * FROM products", (error, result) => {
        if (error) {
            console.log(error)
            return helper.response(res, 'fail', 'Internal server Error', 500)
        }
        
        return helper.response(res, 'success', result, 200)
    })
})

app.post('/products', (req, res) => {
    const setData = req.body
    conn.query("INSERT INTO products SET ?", setData, (error, result) => {
        if (error) {
            console.log(error)
            return helper.response(res, 'fail', 'Internal server Error', 500)
        }
        const newData = {
            id :result.insertId,
            ...setData
        }
        return helper.response(res, 'success', newData, 200)
    })
})

app.put('/products/:id', (req, res) => {
    const setData = req.body
    const id = req.params.id
    conn.query("UPDATE products SET ? WHERE id=?", [setData, id], (error, result) => {
        if (error) {
            console.log(error)
            return helper.response(res, 'fail', 'Internal server Error', 500)
        }
        const newData = {
            id :result.insertId,
            ...setData
        }
        return helper.response(res, 'success', newData, 200)
    })
})

app.delete('/products/:id', (req, res) => {
    const id = req.params.id
    conn.query("DELETE FROM products WHERE id=?", id, (error, result) =>{
        if (error) {
            console.log(error)
            return helper.response(res, 'fail', 'Internal server Error', 500)
        }
        const newData = {
            id :result.insertId
        }
        return helper.response(res, 'success', newData, 200)
    })
})

app.listen(3000, (req, res) => {
    console.log('POS API running in http://localhost:3000')
})