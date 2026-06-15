const express = require('express')
const { getVendors, getMyProducts, getMyProduct, addProduct, updateProduct, becomeVendor } = require('../controller/vendorController')
const { forVendor, forUser } = require('../Middleware/authHandler')


const router = express.Router()

router.get('/',getVendors)
router.get('/products',forVendor,getMyProducts)
router.get('/products/:pid',forVendor,getMyProduct)

router.post('/request',forUser,becomeVendor)
router.post('/products',forVendor,addProduct)
router.put('/products/:pid',forVendor,updateProduct)



module.exports = router
