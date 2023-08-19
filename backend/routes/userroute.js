const express=require('express')
const { registerUser, loginuser, getMe } = require('../controller/usercontroller')
const routers=express.Router()
const {protect}=require('../middleware/authmiddle')

routers.post('/',registerUser)
routers.post('/login',loginuser)
routers.post('/Me',protect,getMe)

module.exports=routers