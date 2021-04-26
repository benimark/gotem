import express from "express"
import mongoose from "mongoose"
import userRouter from "./routers/userRouter.js"
import productRouter from "./routers/productRouter.js"
import bp from "body-parser"
import orderRouter from "./routers/orderRouter.js"
import otherRouter from "./routers/otherRouter.js"
import path from "path"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(bp.json({limit: '50mb'}))
app.use(bp.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/gotem',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify: false
}).catch(()=>{
    console.log("Cant connect to MongoDB server");
})

app.use('/api/v1/users',userRouter)

app.use('/api/v1/other',otherRouter)

app.use('/api/v1/orders',orderRouter)

app.use('/api/v1/products',productRouter)

app.get('/',(req,res)=>{
    res.send("Server is good bro")
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/client/build')))

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'frontend','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("The server has been created! Port: "+PORT);
})