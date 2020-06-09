const helper = require('../helpers/index')
const productModel = require('../model/product')

module.exports = {
    getAllProduct : async (req,res) => {
        try {
            const result = await productModel.getAllProductModel()
            return helper.response(res, 'success', result, 200)
        } catch (error) {
            console.log(error)
            return helper.response(res, 'fail', 'Internal server Error', 500)
        }
    },
    addProduct : async (req, res) => {
        const setData = req.body
        try {
            const result = await productModel.addProductModel(setData);
            return helper.response(res, 'success', result, 201)
        } catch (error) {
            console.log(error)
            return helper.response(res, 'fail', 'Internal server Error', 500)
        }
    },
    updateProduct : async (req, res) => {
        const setData = req.body
        const id = req.params.id
        try {
            const result = await productModel.updateProductModel([setData,id]);
            return helper.response(res, 'success', result, 200)
        } catch (error) {
            if (error) {
                console.log(error)
                return helper.response(res, 'fail', 'Internal server Error', 500)
            }
        }
    },
    deleteProduct : async (req, res) => {
        const id = req.params.id
        try {
            const result = await productModel.deleteProductModel(id)
            return helper.response(res, 'success', result, 200)
        } catch (error) {
            console.log(error)
            return helper.response(res, 'fail', 'Internal server Error', 500)
        }
    }
}