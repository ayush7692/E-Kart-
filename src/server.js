const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./config/db')
const errorHandler = require('./Middleware/errorHandler')


const PORT = process.env.PORT || 3000
// MiddleWare 
app.use(express.json())
app.use(express.urlencoded())

connectDB()

// All Routes Import 
const authrouter = require('./routes/authRoutes')

const productrouter = require('./routes/productRoutes')
const vendorRouter = require('./routes/vendorRoutes')
const userRouter = require('./routes/userRoutes')
const cartRouter = require('./routes/cartRoutes')
const orderRouter = require('./routes/orderRoutes')




// All Routes
app.use('/api/auth',authrouter)
app.use('/api/products',productrouter)
app.use('/api/vendor',vendorRouter)
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)







// API Testing
app.get('/',(req,res)=>{
    res.send("API is working")
})

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`server on port ${PORT}`)
})