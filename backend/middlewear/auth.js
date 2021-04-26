import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import dotenv from "dotenv"
dotenv.config()

export const auth = async(req,res,next) =>{
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const isGood = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findOne({_id:isGood._id})
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(400).send(error)
    }
}