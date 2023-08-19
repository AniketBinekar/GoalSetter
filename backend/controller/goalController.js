
const asynchandler=require('express-async-handler')
const Goal = require('../models/goalModel')
const User =require('../models/userMode')
// @desc    get goal
// @route   DELETE /api/goals/:id

const { error } = require("console")

// @access  Private
const getGoals=asynchandler(async (req,res)=>{

    const goal=await Goal.find({user: req.user.id})
    res.status(300).json(goal)
})
// @desc    update goal
// @route   DELETE /api/goals/:id
// @access  Private
const updateGoals=asynchandler(async (req,res)=>{
    if(!req.body.text)
    {
        res.status(400)
        throw new Error('please add text only')
    }

     const goal =await Goal.create({
        text: req.body.text,
        user:req.user.id
     })
    res.status(200).json(goal)
})
// @desc    put goal
// @route   DELETE /api/goals/:id
// @access  Private
const putGoals=asynchandler(async (req,res)=>{

    const goal=await Goal.findById(req.params.id)

    if(!goal)
    {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    // check for user
    if(!req.user)
    {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure logged user matches the goals user
    if(goal.user.toString()!== user.id)
    {
        res.status(401)
        throw new Error('User not found')
    }
    const updategoal=await Goal.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(300).json(updategoal)
})
// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoals=asynchandler(async (req,res)=>{

    const goals=await Goal.findById(req.params.id)

    if(!goals)
    {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    // check for user
    if(!req.user)
    {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure logged user matches the goals user
    if(goals.user.toString()!== user.id)
    {
        res.status(401)
        throw new Error('User not authorized')
    }

    await goals.remove()

    res.status(200).json({id:req.params.id})
})
module.exports=
{
getGoals,
updateGoals,
putGoals,
deleteGoals
}