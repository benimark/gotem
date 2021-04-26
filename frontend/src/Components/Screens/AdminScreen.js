import React, { useState, useEffect } from 'react'
import classes from "./Admin.module.css"
import {Grid} from "@material-ui/core"
import BlackButton from "../LittleComponents/BlackButton"
import TextInput from "../LittleComponents/TextInput"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {useDispatch,useSelector} from "react-redux"
import {getOrders, getUserList, updateOrders} from "../../actions/adminActions"
import DoneIcon from '@material-ui/icons/Done'
import ClearIcon from '@material-ui/icons/Clear'
import {listProducts} from "../../actions/productActions"
import Loading from "../LittleComponents/Loading"
import AddIcon from '@material-ui/icons/Add';
import moment from "moment"
import $ from "jquery"
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import axios from 'axios'

export default function AdminScreen(props) {
    const [currentPage, setcurrentPage] = useState("orders")
    const [search,setSearch] = useState(undefined)
    const [sent,setSent] = useState(false)

    const dispatch = useDispatch()
    const allorderList = useSelector(state => state.allorderList)
    const alluserList = useSelector(state => state.alluserList)
    const productList = useSelector((state)=>state.productList)
    const {products} = productList
    const {userInfo} = useSelector(state => state.userLogin)
    const {allOrders} = allorderList
    const {allUsers} = alluserList

    useEffect(()=>{
        dispatch(getOrders("unsent"))
        dispatch(getUserList())
        dispatch(listProducts())
    },[dispatch])

    useEffect(()=>{
        if(!userInfo){
            props.history.push('/login')
        }
    })
    useEffect(()=>{
        if(props.location.search && search===undefined){
            document.getElementById("OrderSearchInput").value= decodeURI(props.location.search.split("=")[1])
            setSearch(decodeURI(props.location.search.split("=")[1]))
        }
    },[props.location, search])

    useEffect(()=>{
        if(search&&search.length!==0){
            props.history.push(`/adminpanel?search=${search}`)
        }else{
            props.history.push('/adminpanel')
        }
    },[currentPage, dispatch, props.history, search])


    //HANDLERS
    const SentHandler =()=>{
        dispatch(getOrders("sent"))
        setSent(true)
    }
    const NotSentHandler =()=>{
        dispatch(getOrders("unsent"))
        setSent(false)
    }
    const sentButton = async(id)=>{
        await axios.patch(`/api/v1/orders/${id}`,null,{headers: {
            'Authorization': `Bearer ${userInfo.token}` 
        }})
        dispatch(updateOrders(id))
    }
    const deleteButton = async(id)=>{
        await axios.delete(`/api/v1/orders/${id}`,{headers: {
            'Authorization': `Bearer ${userInfo.token}` 
        }})
        dispatch(updateOrders(id))
    }
    const handleToggle = (id)=>{
        $('#'+id).slideToggle()
    }
    const newProduct = async() =>{
        props.history.push(`/adminpanel/new/product`)
    }

    return (
        
        <div className={classes.Admin}>
            <Grid container style={{height:"100%"}}>
                <Grid item md={12} lg={3} className={classes.AdminButtons}>
                    <BlackButton onclick={()=>setcurrentPage("orders")}>Orders</BlackButton>
                    <BlackButton onclick={()=>setcurrentPage("users")}>Users</BlackButton>
                    <BlackButton onclick={()=>setcurrentPage("products")}>Products</BlackButton>
                </Grid>
                <Grid item lg={9} md={12} className={classes.Style} style={{overflow:"auto"}} >
                        {
                        {
                            "orders": [
                            <Grid container className={classes.OrderTop}>
                                    <Grid item lg={6} md={12}>
                                        <h1>Orders <span className={classes.OrderLength}>({allOrders?allOrders.length:"0"})</span></h1>
                                        <h3 style={{color:sent?"#46e06f":"#FA5555"}}>{sent?"Sent orders":"Not sent orders"}</h3>
                                    </Grid>
                                    <Grid item lg={6} md={12}>
                                        <TextInput id="OrderSearchInput" onChange={(e)=>setSearch(e.target.value)} label="search.." variant="outlined"></TextInput>
                                        <div className={classes.Icons}>
                                            <ClearIcon onClick={NotSentHandler} className={classes.NotSentIcon}></ClearIcon>
                                            <DoneIcon onClick={SentHandler} className={classes.SentIcon}></DoneIcon>
                                        </div>
                                    </Grid>
                             </Grid>,
                             allOrders?allOrders.map(entry => {
                                 if(sent===entry.sent && ((search?entry.ShippingAddress[0].fullname.toLowerCase().includes(search.toLowerCase()):true) || (search?entry.ShippingAddress[0].email.toLowerCase().includes(search.toLowerCase()):true) || (search?entry.User.toLowerCase().includes(search.toLowerCase()):true) || (search?entry._id.toLowerCase().includes(search.toLowerCase()):true) || (search?moment(entry.createdAt).format('LLLL').toLowerCase().includes(search.toLowerCase()):true))){
                                    return <Grid container id={entry._id+entry.createdAt} key={entry._id+entry.createdAt}>
                                        <Grid item md={12}>
                                            <div className={classes.card}>
                                            <Grid container>
                                                <Grid item md={6} onClick={()=>handleToggle(entry._id)}>
                                                    <h3>{entry.ShippingAddress[0].fullname}<span><FiberManualRecordIcon style={{fontSize:"14px",marginLeft:"10px",color:entry.sent?"#46e06f":"#FA5555"}} /></span></h3>
                                                    <h3>{moment(entry.createdAt).format('LLLL')}</h3> 
                                                </Grid>
                                                <Grid item md={6} onClick={()=>handleToggle(entry._id)} className={classes.showMoreDiv}>
                                                    <ExpandMoreIcon className={classes.ExpandMoreIcon}></ExpandMoreIcon>
                                                </Grid>
                                                <Grid container id={entry._id} style={{display:"none"}} className={classes.details}>
                                                    <Grid item md={6}>
                                                        <h3 style={{color:entry.sent?"#46e06f":"#FA5555"}}>Status: {entry.sent?"Sent":"Not sent"}</h3>
                                                        <h3>{entry.ShippingAddress[0].fullname}</h3>
                                                        <h3>{entry.ShippingAddress[0].email}</h3>
                                                        <h3>{entry.ShippingAddress[0].city} {entry.ShippingAddress[0].state}, {entry.ShippingAddress[0].zip}</h3>
                                                        <h3>{entry.ShippingAddress[0].address}</h3>
                                                        <h3>Total price: ${entry.OrderedProducts.reduce((sum,next)=>sum+next.price,0)}</h3>
                                                        <h3>UserID: {entry.User}</h3>
                                                        <h3>OrderID: {entry._id}</h3>
                                                        <div className={classes.buttons}>
                                                    {!entry.sent?<Grid item md={12}>
                                                        <BlackButton onclick={()=>sentButton(entry._id)} className={classes.SentButton}>Mark as sent</BlackButton>
                                                    </Grid>:<BlackButton onclick={()=>sentButton(entry._id)} className={classes.SentButton}>Mark as unsent</BlackButton>}
                                                    <Grid item md={12} className={classes.deleteButtonDiv}>
                                                        <BlackButton onclick={()=>deleteButton(entry._id)} className={classes.SentButton}>Delete order</BlackButton>
                                                    </Grid>
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={6}>
                                                        {
                                                        entry.OrderedProducts.map((entry)=>{
                                                            return (
                                                                <Grid container key={entry._id} className={classes.CartItems}>
                                                                <Grid item md={6}>
                                                                    <img src={entry.img&&`data:image/jpeg;base64,${entry.img}`} alt={entry}></img>
                                                                </Grid>
                                                                <Grid item md={6} className={classes.products}>
                                                                    <h2>{entry.model},{entry.type}</h2>
                                                                    <h2>{entry.name}</h2>
                                                                    <h2>${entry.price}</h2>
                                                                    <h2>EU{entry.size}</h2>
                                                                    <hr></hr>
                                                                </Grid>
                                                                </Grid>
                                                            )
                                                             })}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            </div>
                                        </Grid>
                                    </Grid>
                                 }
                                 return null
                            })
                            :<Loading></Loading>]
                            ,
                            "users":[
                            <Grid container className={classes.Users}>
                                <Grid item md={6}>
                                    <h1>Users</h1>
                                </Grid>
                                <Grid item md={6}>
                                    <TextInput id="OrderSearchInput" onChange={(e)=>setSearch(e.target.value)} label="search.." variant="outlined"></TextInput>
                                </Grid>
                         </Grid>,allUsers?allUsers.map(entry=>{
                             if(search? ((entry._id.includes(search)) || (entry.name.includes(search))):true){
                             return <Grid key={entry._id} className={classes.UsersCard} container onClick={()=>props.history.push(`/adminpanel/user/${entry._id}`)}>
                                <Grid item md={12} className={classes.card}>
                                        <h2>{entry.name} {entry.isAdmin?<span style={{backgroundColor:"#4C8BDB",color:"white",verticalAlign:"top",padding:"5px",borderRadius:"5px",fontSize:"12px"}}>Admin</span>:null}</h2>
                                </Grid>
                             </Grid>
                         }
                         return null
                        }):<Loading></Loading>],

                            "products":[
                            <Grid container className={classes.Products}>
                                <Grid item md={6}>
                                    <h1>Products</h1>
                                </Grid>
                                <Grid item md={6}>
                                    <TextInput id="OrderSearchInput" onChange={(e)=>setSearch(e.target.value)} label="search.." variant="outlined"></TextInput>
                                </Grid>
                             </Grid>,
                             <Grid container className={classes.Products}>
                                {products&&products.map(entry => 
                                    <Grid lg={3} item key={entry._id} onClick={()=>props.history.push(`/adminpanel/products/${entry._id}`)} className={classes.Product}>
                                        <img src={`data:image/jpeg;base64,${entry.img}`} alt={entry.name}></img>
                                        <p>{entry.model} {entry.type}, {entry.name}</p>
                                    </Grid>
                                )}
                                <Grid lg={3} item style={{display:"flex",justifyContent:"center",alignItems:"center",height:"160px"}}>
                                    <AddIcon onClick={newProduct} style={{color:"white",backgroundColor:"rgb(29,29,29)",padding:"10px",borderRadius:"50%",cursor:"pointer",fontSize:"30px",marginTop:"10px"}}></AddIcon>
                                </Grid>
                            </Grid>
                            ]

                        }[currentPage]
                        }
                         
                </Grid> 
            </Grid>
        </div>
    )
}
