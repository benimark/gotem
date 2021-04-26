import Order from "../models/orderModel.js"
import express from "express"
import Product from "../models/productModel.js"

const otherRouter = express.Router()

otherRouter.get('/newArrivals',async(req,res)=>{
    const newArrivals = await Product.find({}).limit(8).sort({createdAt:-1}).select({_id:1,name:1,type:1,model:1,img:1})
    res.send(newArrivals)
})
export default otherRouter