import Order from "../models/orderModel.js"
import User from "../models/userModel.js"
import express from "express"
import {auth} from "../middlewear/auth.js"
import Product from "../models/productModel.js"
const orderRouter = express.Router()

orderRouter.get(`/`,auth,async(req,res)=>{
    try {
        const type = req.header('type')
        if(type==="sent"){
            const orders = await Order.find({sent:true}).sort({updatedAt:-1})
            return res.send(orders)
        }
        if(type==="unsent"){
            const orders = await Order.find({sent:false}).sort({updatedAt:-1})
            return res.send(orders)
        }
        const orders = await Order.find({}).sort({updatedAt:-1})
        res.send(orders)
    } catch (error) {
        res.status(500).send(error)
    }
})

orderRouter.get(`/byid/:id`,async(req,res)=>{
    const _id = req.params.id
    const orders = await Order.find({_id}).sort({updatedAt:-1})
    res.status(200).send({orders})
    if(!orders){
        res.status(404).send({error:"No orders found."})
    }
})

orderRouter.patch('/:orderId',auth,async(req,res)=>{
    if(req.user.isAdmin){
        const order = await Order.findById({_id:req.params.orderId})
        if(order.sent){
            order.sent = false
        }else{
            order.sent = true
        }
        await order.save()

        if(order){
            return res.send(order.sent)
        }
        res.status(404).send("No order found")
    }else{
        res.send("You need to be an admin to do this request.")
    }
})
orderRouter.delete('/:orderId',auth,async(req,res)=>{
    if(req.user.isAdmin){
        const order = await Order.findByIdAndDelete({_id:req.params.orderId}) 
        const {orders} = await User.findById({_id:order.User})
        const newOrders = orders.filter(entry => !order === entry)
        await User.findByIdAndUpdate({_id:order.User},{orders:newOrders})
        if(order){
            return res.send(order)
        }
        res.status(404).send("No order found")
    }else{
        res.send("You need to be an admin to do this request.")
    }
})

orderRouter.get(`/:userid`,async(req,res)=>{
    const _id = req.params.userid
    const orders = await Order.find({User:_id}).sort({updatedAt:-1})
    res.status(200).send(orders)
    if(!orders){
        res.status(404).send({error:"No orders found."})
    }
})

orderRouter.post(`/newOrder`,auth,async(req,res)=>{
    if(req.body.OrderedProducts.length==0){
        res.status(400).send({error:"The cart is empty."})
    }else{
        const order = new Order({
            OrderedProducts : req.body.OrderedProducts,
            ShippingAddress : req.body.ShippingAddress,
            User : req.user._id
        })

        const {orders} = await User.findById({_id:req.user._id})
        await User.findByIdAndUpdate({_id:req.user._id},{orders:orders.concat(order)})
        await order.save().catch(()=>{
            res.send("Please log in")
        })
        res.status(201).send(order)
    }   
})

export default orderRouter