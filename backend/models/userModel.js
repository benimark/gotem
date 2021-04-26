import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import validator from "validator"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        validate(value){
            if(value.length<3){
                throw new Error("Name needs to be longer than 3 digits!")
            }
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please write a valid email address!")
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(value.length<8){
                throw new Error("Password needs to be longer than 8 digits!")
            }
        }
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required:true
    },
    isMainAdmin:{
        type:Boolean,
        default:false,
        required:true
    },
    tokens:[{
        type:String,
        default:[]
    }],
    orders:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Order",
            required:true
        }
    ]
},{
    timestamps:true
})

userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
    user.tokens = user.tokens.concat(token)
    await user.save()
    return token
}

userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

const User = mongoose.model("User",userSchema)

export default User