const conn = require('../helpers/mysql')

module.exports = {
    getAllProductModel : () => {
        return new Promise((resolve, reject) => {
            conn.query("SELECT * FROM products", (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    },
    addProductModel : (setData) => {
        return new Promise((resolve,reject) => {
            conn.query("INSERT INTO products SET ?", setData, (error, result) => {
                if (error) {
                    reject(error)
                }
                const newData = {
                    id :result.insertId,
                    ...setData
                }
                resolve(newData)
            })
        })
    },
    updateProductModel : ([setData, id]) => {
        return new Promise((resolve, reject) => {
            conn.query("UPDATE products SET ? WHERE id=?", [setData, id], (error, result) => {
                if (error) {
                    reject(error)
                }
                const newData = {
                    id,
                    ...setData
                }
                resolve(newData)
            })
        })
    },
    deleteProductModel : (id) => {
        return new Promise((resolve,reject) => {
            conn.query("DELETE FROM products WHERE id=?", id, (error, result) =>{
                if (error) {
                    reject(error)
                }
                const newData = {
                    id
                }
                resolve(newData)
            })
        })
    }
}