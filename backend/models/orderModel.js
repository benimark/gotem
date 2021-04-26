import mongoose from "mongoose"
import validator from "validator"

const orderSchema = mongoose.Schema({
    OrderedProducts:[{
        name:{
            type: String,
            required:true
        },
        type:{
            type:String,
            required:true
        },
        model:{
            type:String,
            required:true
        },
        sizes:{
            sizes:[{
                type:Number,
                required:true
            }],
            prices:[{
                required:true,
                type:Number
            }],
            formattedPrices:[{
                required:true,
                type:String
            }]
        },
        size:{
            type:Number,
            required:true
        },
        img:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
        }
    }],
    ShippingAddress:[{
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        zip:{
            type:String,
            required:true
        },
        fullname:{
            type:String,
            required:true
        },
        email:{
            type:String,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Please give a valid email address")
                }
            }
        },
        phone:{
            type:String,
            required:true
        }
    }],
    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    orderedAt:{
        type:Date
    },
    sent:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})
const Order = mongoose.model('Order',orderSchema)
export default Order