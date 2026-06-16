const Address = require("../model/adressmodel")
const Cart = require("../model/cartmodel")
const Order = require("../model/ordermodel")
const User = require("../model/usermodel")

const createOrder = async(req,res)=>{
    const userId = req.user

    const user = await User.findById(userId).select('name phone email')

    const cart = await Cart.findOne({user:userId}).populate('products.product')
    if(!cart){
        res.status(404)
        throw new Error('cart not available')
    }

    const bill = cart.products.map((item)=>{
        return{
            product : item.product._id,
            qty : item.qty,
            price : item.product.price
        }
    })

    let totalBill = bill.reduce((acc,item)=>{
        return acc+item.qty*item.price
    },0)

    const useraddress = await Address.findOne({user:userId})
    if(!useraddress){
        res.status(404)
        throw new Error('please add address first')
    }
    const order = await Order.create({
        user:user,
        totalBillAmount: totalBill,
        address:useraddress,
        status:"placed"
 })
    
    res.status(200).json(order)

}
const getMyOrder = async(req,res)=>{
    const userId = req.user._id

    const order  = await Order.findOne({user:userId}).populate('user','name email phone').populate('address')
    if(!order){
        res.status(400)
        throw new Error('no order found')
    }

    res.status(200).json(order)
}








module.exports = { createOrder, getMyOrder }