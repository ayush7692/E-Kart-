const { default: mongoose } = require("mongoose");
const User = require("./usermodel");


const addressShema = new mongoose.Schema({

    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name:{
        type : String,
        required: true,
        tirm: true
    },
    street:{
        type : String,
        required: true,
        trim: true
    },
    city:{
        type : String,
        required: true,
        trim: true
    },
    pinCode:{
        type : Number,
        required: true
    },
    country:{
        type : String,
        required: true,
        default: "India"
    }
},{
    timestamps:true
})

const Address = mongoose.model("Address", addressShema)

module.exports = Address