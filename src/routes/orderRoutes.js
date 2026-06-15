const express = require('express')
const { getMyOrder, createOrder } = require('../controller/orderController')

const router = express.Router()

router.get('/',forUser,getMyOrder)
router.post('/',forUser,createOrder)

module.exports = router