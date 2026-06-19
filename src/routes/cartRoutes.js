
const express = require('express')
const { getCart, addToCart, clearCart, increaseItem, decreaseItem } = require('../controller/cartController')
const { forUser } = require('../Middleware/authHandler')

const router = express.Router()

router.get('/',forUser,getCart)
router.post('/:pid',forUser,addToCart)
router.put('/increase',forUser,increaseItem)
router.put('/decrease',forUser,decreaseItem)
router.delete('/',forUser,clearCart)


module.exports = router