const mongoose = require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add the name value']
    },
    email:{
        type:String,
        required:[true,'Please add the email value'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please add the Password value']
    },
},
{
    timeStamp:true,
})
module.exports=mongoose.model('User',userSchema)