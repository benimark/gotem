import React, {useState} from 'react'
import classes from "./NewProduct.module.css"
import {Grid} from "@material-ui/core"
import TextInput from "../LittleComponents/TextInput"
import 'react-dropdown/style.css';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Axios from "axios"
import BlackButton from "../LittleComponents/BlackButton"
import { useSelector } from 'react-redux';

export default function AdminProductScreen(props) {
    const {userInfo} = useSelector(state => state.userLogin)
    //CHANGE DETAILS
    const [model,setModel] = useState("")
    const [type,setType] = useState("")
    const [name,setName] = useState("")
    const [descFront,setDescFront] = useState("")
    const [descBack,setDescBack] = useState("")
    const [size,setSize] = useState({sizes:[],prices:[],quantity:[]})

    const handleSizeChange = (e,index) =>{
        let sizes = size
        sizes.sizes[index] = parseInt(e.target.value)
        setSize({...size,sizes:sizes.sizes})
    }
    const handleQuantityChange = (e,index) =>{
        let sizes = size
        sizes.quantity[index] = parseInt(e.target.value)
        setSize({...size,quantity:sizes.quantity})
    }
    const handlePriceChange = (e,index) =>{
        let sizes = size
        sizes.prices[index] = parseInt(e.target.value)
        setSize({...size,prices:sizes.prices})
    }
    const addRowHandler = () =>{
        let sizes = size
        sizes.prices.push(1)
        sizes.sizes.push(1)
        sizes.quantity.push(1)
        setSize({prices:sizes.prices,quantity:sizes.quantity,sizes:sizes.sizes})
    }
    const createHandler = async() =>{
        try {
            const datas = {model,type,name,description:{front:descFront,back:descBack},sizes:size}
            const {data} = await Axios.post(`/api/v1/products/new`,{datas},{
                headers: {
                  'Authorization': `Bearer ${userInfo.token}`
                }
            })
            props.history.push(`/adminpanel/products/${data._id}`)
        } catch (error) {
            error&&error.response&&alert(error.response.data)
        }
    }
    const deleteRowHandler = (index) =>{
        let sizes = size
        const updatedSizes = sizes.sizes.filter((entry,i) => i !== index)
        setSize({...size,sizes:updatedSizes})
    }

    return (
        <div className={classes.mainDiv} style={{margin:"auto",marginBottom:"10vh"}}>
                <Grid container>
                    <Grid item lg={12} style={{marginBottom:"30px"}}>
                        <h1>Create a new product</h1>
                    </Grid>
                    <Grid container style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <Grid item lg={12} className={classes.inputs}>
                            <h3>Shoe model,type and name</h3>
                            <TextInput id="model" onChange={(e)=>setModel(e.target.value)} value={model} label="Model" variant="outlined"></TextInput>
                            <TextInput id="type" onChange={(e)=>setType(e.target.value)} value={type} label="Type" variant="outlined"></TextInput>
                            <TextInput id="name" onChange={(e)=>setName(e.target.value)} value={name} label="Name" variant="outlined"></TextInput>
                            <h3>Front description</h3>
                            <TextInput id="desc1" onChange={(e)=>setDescFront(e.target.value)} value={descFront} rows={5} multiline variant="outlined"></TextInput>
                            <h3>Back description</h3>
                            <TextInput id="desc2" onChange={(e)=>setDescBack(e.target.value)} value={descBack} multiline rows={5} variant="outlined"></TextInput>  
                            <Grid item lg={12}>
                                <table>
                                    <tbody>
                                    <tr>
                                        <th>Size</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                    {
                                        size.sizes&&size.sizes.map((entry,i)=>{
                                            var random = Math.floor(Math.random()*100000)
                                            return <tr key={entry+i+random}>
                                                <td><TextInput id={"size"+i} type="number" onChange={(e)=>handleSizeChange(e,i)} value={size.sizes[i]>1?size.sizes[i]:1} variant="outlined"></TextInput></td>
                                                <td><TextInput type="number" onChange={(e)=>handleQuantityChange(e,i)} value={size.quantity[i]>1?size.quantity[i]:1} variant="outlined"></TextInput></td>
                                                <td style={{position:"relative"}}><TextInput type="number" onChange={(e)=>handlePriceChange(e,i)} label={"$"} value={size.prices[i]>1?size.prices[i]:1} variant="outlined"></TextInput>
                                                <HighlightOffIcon onClick={()=>deleteRowHandler(i)} style={{cursor:"pointer",position:"absolute",bottom:"0",right:"0",backgroundColor:"#bd3a3c",borderRadius:"50%",color:"white",fontSize:"20px"}}></HighlightOffIcon>
                                                </td>
                                            </tr>
                                        })
                                    }
                                    <tr>
                                        <td style={{textAlign:"center",cursor:"pointer"}}><AddIcon onClick={addRowHandler} style={{backgroundColor:"rgb(29,29,29)",borderRadius:"50%",padding:"5px",color:"white"}}></AddIcon></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <Grid item lg={12} style={{display:"flex"}}>
                            <BlackButton onclick={createHandler} style={{marginRight:"10px"}}>Create product</BlackButton>
                        </Grid>
                    </Grid>
                </Grid>
        </div>
    )
}
