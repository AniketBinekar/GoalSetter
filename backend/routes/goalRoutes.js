const express=require('express')
const router=express.Router()
const {getGoals, updateGoals, putGoals, deleteGoals}=require('../controller/goalController')
const {protect}=require('../middleware/authmiddle')

//  two in one
router.route('/').get(protect,getGoals).post(protect,updateGoals)

// router.get('/',getGoals)

// router.post('/',updateGoals)

// two in one
router.route('/:id').put(protect,putGoals).delete(protect,deleteGoals)

// router.put('/:id',putGoals)

// router.delete('/:id',deleteGoals)

module.exports=router