
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const asynchandler=require('express-async-handler')
const User =require('../models/userMode')

const registerUser=asynchandler(async(req,res)=>
{
    const {name,email,password}=req.body
    if(!name || !email || !password)
    {
        res.status(400)
        throw new Error('Please add all Fields')
    }
    // check user exist
    const userexist=await User.findOne({email})
    if(userexist)
    {
        res.status(400)
        throw new Error('User already eexist')
    }

     const salt= await bcrypt.genSalt(10)
      const hashpassword=await bcrypt.hash(password,salt)

      const user=await User.create({
        name,
        email,
        password:hashpassword,
      })

      if(user)
      {
        res.status(201).json({
            _id: user.id,
            name:user.name,
            email:user.email,
            token: generateToken(user._id),

        })
      }
      else
      {
        res.status(400)
        throw new Error('Invalid User Data')
      }
    // res.json({message:'Register User'})
})

// authenticate the user

const loginuser = asynchandler(async(req,res)=>
{

    const{email,password}=req.body
    const user=await User.findOne({email})

    if(user &&(await bcrypt.compare(password,user.password)))
    {
        res.json({
                _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    }
    else
    {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
    
})
const getMe=asynchandler(async(req,res)=>
{
    const {_id,name,email}=await User.findById(req.user.id)

    res.status(300).json({
      _id:_id,
      name:name,
      email:email,

    })
    // res.json({message:'User Data Display'})
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }

module.exports=
{
    registerUser,
    loginuser,
    getMe
}