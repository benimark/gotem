import express from "express"
import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import { auth } from "../middlewear/auth.js"
dotenv.config()

const userRouter = express.Router()

userRouter.get('/list',auth,async(req,res)=>{
    if(req.user.isAdmin){
        const users = await User.find({}).select({name:1,isAdmin:1,_id:1})
        res.status(200).send(users)
    }else{
        res.send({error:"You need to be an admin to do this request!"})
    }
})
userRouter.post('/:id/setadmin',auth,async(req,res)=>{
    if(req.user.isAdmin){
        try {
        const {isAdmin} = await User.findById({_id:req.params.id})
        const user = await User.findByIdAndUpdate({_id:req.params.id},{isAdmin: !isAdmin})
        if(!user){
            return res.status(404).send("User not found")
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }}
})

userRouter.get('/:id',auth,async(req,res)=>{
    if(req.user.isAdmin){
        try {
        const user = await User.findById({_id:req.params.id})
        res.send(user)
    } catch (error) {
        return res.status(404).send(error)
    }}
})

userRouter.get('/all',async(req,res)=>{
    const users = await User.find({})
    res.send(users)
})

userRouter.post('/signup',async(req,res)=>{
    try {
        const newUser = new User(req.body)
        await newUser.save()
        const token = await newUser.generateToken()
        res.send({
            _id:newUser._id,
            email:newUser.email,
            password:newUser.password,
            isAdmin:newUser.isAdmin,
            isMainAdmin:newUser.isMainAdmin,
            name:newUser.name,
            token
        })
    } catch (error) {
        res.status(500).send(error)
    }
    
})
userRouter.delete('/:id',auth,async(req,res)=>{
    if(req.user.isAdmin){
        const user = await User.findByIdAndDelete({_id:req.params.id})
        if(!user){
           return res.status(404).send("This user is not found!")
        }
        res.send("Done")
    }else{
        res.send({error:"You need to be an admin to do this request!"})    
    }
})

userRouter.post('/logout',auth,async(req,res)=>{
    if(!req.user){
       return res.status(500).send({error:"Unable to auth"})
    }
    const tokens = req.user.tokens.filter((entry) => entry !== req.token)
    req.user.tokens = tokens
    await req.user.save()
    res.send(req.user)
})
userRouter.post('/signin',async(req,res)=>{
   const user = await User.findOne({email:req.body.email})
   if(user){
        if(bcrypt.compareSync(req.body.password,user.password)){
            const token = await user.generateToken()
            res.send({
                _id:user._id,
                email:user.email,
                password:user.password,
                isAdmin:user.isAdmin,
                isMainAdmin:user.isMainAdmin,
                name:user.name,
                token
            })
        }else{
            res.status(401).send({Error:"Invalid email or password"})
        }
   }else{
       res.status(401).send({Error:"Invalid email or password"})
   }
})

export default userRouter