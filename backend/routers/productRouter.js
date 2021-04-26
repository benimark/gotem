import Product from "../models/productModel.js"
import express from "express"
import { auth } from "../middlewear/auth.js"
import multer from "multer"

const upload = multer()
const productRouter = express.Router()

productRouter.patch('/update/:id',auth,async(req,res)=>{
    if(req.user.isAdmin){
        try {
            const {data} = req.body
            const product = await Product.findByIdAndUpdate({_id:req.params.id},{
                model:data.model,
                type:data.type,
                name:data.name,
                description:{front:data.description.front,back:data.description.back},
                sizes:data.sizes
            })
            res.send("Save completed!")
        } catch (error) {
            res.status(400).send(error)
        }
    }else{
        res.send("You need to be an admin to do this request!")
    }
})
productRouter.delete('/:id',auth,async(req,res)=>{
    if(req.user.isAdmin){
        await Product.findByIdAndDelete({_id:req.params.id})
        res.send('Deleted')
    }else{
            res.send("You need to be an admin to do this request!")
    }
})
productRouter.delete('/:id/images',auth,async(req,res)=>{
    if(req.user.isAdmin){
        const index = req.header('index')
        const {images} = await Product.findById({_id:req.params.id})
        const deletedImage = images[index]
        const newImages = images.filter(entry => entry!==deletedImage)
        await Product.findByIdAndUpdate({_id:req.params.id},{images:newImages})
        res.send('Deleted')
    }else{
            res.send("You need to be an admin to do this request!")
    }
})

productRouter.post('/:id/uploadMoreImages',auth,upload.array('file'),async(req,res)=>{
    if(req.user.isAdmin){
     try {
            const bufferList = req.files.map((entry)=>{
                return new Buffer(entry.buffer).toString("base64")
            })
            const {images} = await Product.findById({_id:req.params.id})
            const product = await Product.findOneAndUpdate({_id:req.params.id},{images:images.concat(bufferList)})
            res.send("Images uploaded")
        } catch (error) {
            res.status(400).send(error)
        } }else{
            res.send("You need to be an admin to do this request!")
        }
})

productRouter.post('/:id/uploadImage',auth,upload.single('file'),async(req,res)=>{
    if(req.user.isAdmin){
        try {
            const img = new Buffer(req.file.buffer).toString("base64")
            const product = await Product.findByIdAndUpdate({_id:req.params.id},{img})
            await product.save()
            res.send("Image uploaded")
         } catch (error) {
             res.status(400).send(error)
         }
    }else{
        res.send("You need to be an Admin to do this request.")
    }
})

productRouter.post('/new',auth,async(req,res)=>{
    try {
        const data = req.body.datas
        const product = new Product({
            model:data.model,
            type:data.type,
            name:data.name,
            sizes:{
                sizes:data.sizes.sizes,
                prices:data.sizes.prices,
                quantity:data.quantity
            },
            description:{
                front:data.description.front,
                back:data.description.back
            }
        })
        await product.save()
        res.send(product)
    } catch (error) {
        res.status(400).send("Unable to create a new product, please double check the name of the product, it should be unique.")
    }
})

productRouter.get('/',async(req,res)=>{
    const products = await Product.find({})
    res.send({products})
})
productRouter.get('/:name/:id',async(req,res)=>{
    try {
        const product = await Product.findOne({name:req.params.name,_id:req.params.id})
        product.attendance = product.attendance + 1
        await product.save()
        res.send(product) 
    } catch (error) {
        res.status(404).send("Error 404, Product not found")
    }  
})
productRouter.get('/:id',async(req,res)=>{
    try {
        const product = await Product.findById({_id:req.params.id})
        res.send(product)
    } catch (error) {
        res.status(404).send("Error 404, Product not found")
    }
})

export default productRouter