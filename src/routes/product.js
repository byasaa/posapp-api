const express = require('express')
const router = express.Router()
const productController = require('../controller/products')

router.get('/', productController.getAllProduct)
router.post('/', productController.addProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router