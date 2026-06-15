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


const getMyProducts = async(req,res)=>{
    res.send("getMy product")
}
const getMyProduct = async(req,res)=>{
    res.send("getMy product")
}


const addProduct = async(req,res)=>{
    res.send("add product")
}

const updateProduct = async(req,res)=>{
    res.send("update product")
}

const getVendors =  async(req,res)=>{
    res.send("get vendor")
}


module.exports = {getMyProducts,getMyProduct,addProduct,updateProduct,getVendors,becomeVendor}

// getMyOrder,getUserOrder,updateOrder