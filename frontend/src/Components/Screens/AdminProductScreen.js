import React, { useEffect, useState } from 'react'
import {useParams} from "react-router"
import classes from "./AdminProductScreen.module.css"
import {useDispatch,useSelector} from "react-redux"
import {getProductById} from "../../actions/productActions"
import {Grid} from "@material-ui/core"
import Loading from "../LittleComponents/Loading"
import TextInput from "../LittleComponents/TextInput"
import Error from "../LittleComponents/Error"
import 'react-dropdown/style.css';
import AddIcon from '@material-ui/icons/Add';
import $ from "jquery"
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Axios from "axios"
import FormData from 'form-data'
import BlackButton from "../LittleComponents/BlackButton"

export default function AdminProductScreen(props) {
    const {id} = useParams()
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.getProduct)
    const {loading,error,product} = productDetails
    const {userInfo} = useSelector(state => state.userLogin)
    //CHANGE DETAILS
    const [model,setModel] = useState("")
    const [type,setType] = useState("")
    const [name,setName] = useState("")
    const [descFront,setDescFront] = useState("")
    const [descBack,setDescBack] = useState("")
    const [size,setSize] = useState("")

    useEffect(()=>{
        if(product&&product._id){
            setModel(product.model)
            setType(product.type)
            setName(product.name)
            setDescFront(product.description.front)
            setDescBack(product.description.back)
            setSize(product.sizes)
        }
    },[product])

    useEffect(() => {
        dispatch(getProductById(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    const handleUploadMainImage = () =>{
        $("#uploadMainFile").click()
    }
    const handleUploadImages = () =>{
        $("#uploadFiles").click()
    }
    const onImageChange = async(e) =>{
        if(e.target.files){
            const data = new FormData();
            for(let x=0;x<e.target.files.length;x++){
                data.append('file', e.target.files[x]);
            }
            await Axios.post(`/api/v1/products/${id}/uploadMoreImages`,data,{
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${userInfo.token}`
                }
            })
            dispatch(getProductById(id))
        }
    }
    const onMainImageChange = async(e) =>{
        if(e.target.files){
            const dataForm = new FormData();
            dataForm.append('file', e.target.files[0]);
            await Axios.post(`/api/v1/products/${id}/uploadImage`,dataForm,{
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${userInfo.token}`
                }
            })
            dispatch(getProductById(id))
        }
    }
    const deleteImage = async(index) =>{
        await Axios.delete(`/api/v1/products/${id}/images`,{
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${userInfo.token}`,
              'index':index
            }
        })
        dispatch(getProductById(id))
    }
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
    const saveHandler = async() =>{
        try {
            const data = {model,type,name,description:{front:descFront,back:descBack},sizes:size}
            await Axios.patch(`/api/v1/products/update/${id}`,{data},{
                headers: {
                  'Authorization': `Bearer ${userInfo.token}`
                }
            })
            dispatch(getProductById(id))    
        } catch (error) {
            alert("Unable to save, "+error)
        }
    }
    const deleteRowHandler = (index) =>{
        let sizes = size
        const updatedSizes = sizes.sizes.filter((entry,i) => i !== index)
        setSize({...size,sizes:updatedSizes})
    }
    const deleteItem = async() =>{
        const {data} = await Axios.delete(`/api/v1/products/${id}`,{
            headers: {
              'Authorization': `Bearer ${userInfo.token}`
            }
        })
        if(data){
            props.history.push(`/adminpanel`)
        }
    }

    return (
        <div className={classes.mainDiv}>
            {product?
                <Grid container>
                    <Grid item lg={12} style={{marginBottom:"30px"}}>
                        <h1>{product.model} {product.type}</h1>
                        <h1>{product.name}</h1>
                    </Grid>
                    <Grid container>
                        <Grid item lg={6}>
                            <div style={{position:"relative"}}>
                                <img src={product.img&&`data:image/jpeg;base64,${product.img}`} style={{cursor:"pointer"}} onClick={handleUploadMainImage} alt={product.name}></img>
                            </div>

                            <Grid container spacing={2}>
                                {product.images&&product.images.map((image,i)=>{
                                    return <Grid item lg={4} key={i} style={{position:"relative"}}>
                                            <img width="100%" src={product.images&&`data:image/jpeg;base64,${image}`} alt={product.name}></img>
                                             <div onClick={()=>deleteImage(i)} ><HighlightOffIcon style={{cursor:"pointer",position:"absolute",bottom:"0",left:"0",backgroundColor:"#bd3a3c",borderRadius:"50%",color:"white",fontSize:"30px"}}></HighlightOffIcon></div>  
                                        </Grid>
                                })}

                                <Grid item lg={4} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                    <div>
                                        <AddIcon onClick={handleUploadImages} style={{fontSize:"40px",cursor:"pointer",backgroundColor:"rgb(29,29,29)",borderRadius:"50%",color:"white"}}></AddIcon>
                                   </div>                
                                </Grid>
                                <input multiple="multiple" id="uploadFiles" onChange={onImageChange} type="file" style={{display:"none"}}></input>   
                                <input id="uploadMainFile" onChange={onMainImageChange} type="file" style={{display:"none"}}></input>   
                            </Grid>
                        </Grid>
                        <Grid item lg={1}></Grid>
                        <Grid item lg={5} className={classes.inputs}>
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
                        <Grid item lg={3} style={{display:"flex"}}>
                            <BlackButton onclick={saveHandler} style={{marginRight:"10px"}}>Save</BlackButton>
                            <BlackButton onclick={deleteItem}>Delete item</BlackButton>
                        </Grid>
                    </Grid>
                </Grid>
            :error&&<Error>{error}</Error>}
            {loading?<Loading></Loading>:null}
        </div>
    )
}
