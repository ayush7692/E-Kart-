const Product = require("../model/productmodel");
const Vendor = require("../model/vendorModel");

const becomeVendor = async(req,res)=>{

    const {companyName,ownerName,contactEmail,phone}= req.body
    const user  = req.user
    const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!companyName ||!ownerName || !contactEmail || !phone ){
        res.status(400)
        throw new Error(" Fill all the detail ") 
    }else if(!nameRegex.test(ownerName)){
        throw new Error("Don't use special character or number in name ")
    }else if (!emailRegex.test(contactEmail)){
        throw new Error("Provide a valide contactEmail id")
    }else if(phone.length>10 || phone.length<10){
        throw new Error("Provide valid Number")
    }

    const vendorExist = await Vendor.findOne({contactEmail:contactEmail})

    if(vendorExist){
        res.status(409)
        throw new Error("vendor already exist")
    }

    const vendor = await Vendor.create({
        companyName,
        ownerName,
        contactEmail,
        phone,
        user
    })

    if(vendor){
        res.status(201).json({
        vendorId : vendor._id,
        companyName:vendor.companyName,
        ownerName:vendor.ownerName,
        phone: vendor.phone,
        contactcontactEmail: vendor.contactEmail,
        createdAt: vendor.createdAt,
    })
    }else{
        res.status(400)
        throw new Error("Ivalid vendor data ")
    }
}

const addProduct = async(req,res)=>{

    const {name,description,category,stock} = req.body
    const vendorId = req.vendor._id

    if(!name ||!description || !category || !stock ){
        res.status(400)
        throw new Error(" Fill all the detail ") }

    const product = await Product.create({
        name,
        description,
        category,
        stock
    })  
    
    if(!addProduct){
        res.status(409)
        throw new Error("product not added")
    }

    res.status(201).json({
        name:product.name,
        description: product.description,
        category:product.category,
        stock:product.stock,
        createdAt: product.createdAt
    })
}

const updateProduct = async(req,res)=>{
    const {name,description,category,stock} = req.body
    const vendorId = req.vendor._id
    const productId = req.params.pid

    const allowedField = ["name","description","category","stock"]  

    if(!allowedField.includes(req.body)){
        res.status(409)
        throw new Error("Entry not allowed")
    }

    const productExist = await Product.findById(productId)
    if(!productExist){
        res.status(404)
        throw new Error("product not found")
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId,
       { $set:{name,description,category,stock}},
        {new:true}
    )
    if(!updateProduct){
        res.status(401)   
        throw new Error("product not update")
    }
    res.status(201).json({
        name:updatedProduct.name,
        description:updatedProduct.description,
        category:updatedProduct.category,
        stock:updatedProduct.stock
    })

}



module.exports = {addProduct,updateProduct,becomeVendor}

// getMyOrder,getUserOrder,updateOrder