const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Product name is required"],
    },
    description :{
        type: String,
        required:[true,"Desc is required"],
    },
    category:{
        type: String,
        required:[true,"category is required"],
    },
    stock:{
        type: Number,
        required:[true,"stock detail is required"],
    },

    isActive:{
        type: Boolean,
        required:true,
        default : true  
    },
},{
    timestamps: true
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product
