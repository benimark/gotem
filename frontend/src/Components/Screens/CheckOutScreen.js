import {Grid} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import TextInput from '../LittleComponents/TextInput'
import classes from "./CheckOut.module.css"
import BlackButton from "../LittleComponents/BlackButton"
import formatCurrency from 'format-currency'
import Paypal from "../Paypal/Paypal"
import {saveshippingAddress} from "../../actions/shippingAddressAction"

export default function CheckOutScreen(props) {
    const dispatch = useDispatch()
    const {userInfo} = useSelector(state => state.userLogin)
    const {cartItems} = useSelector(state => state.cart)
    const [phone,setPhone] = useState("")
    //SHIPPING
    const [fullname,setFullname] = useState("")
    const [address,setAddress] = useState("")
    const [city,setCity] = useState("")
    const [state,setState] = useState("")
    const [zip,setZip] = useState("")

    const [paypal,setPaypal] = useState(false)

    const handlePaymentScreen =()=>{
        dispatch(saveshippingAddress({phone,fullname,email:userInfo.email,address,city,state,zip}))
        if(fullname && address && city && state && zip && phone){
            setPaypal(true)
        }else{
            alert("Please fill all of the forms")
        }
    }

    useEffect(()=>{
        if(!userInfo){
            props.history.push(`/login?redirect=checkout`)
        }
        if(cartItems.length===0){
            props.history.push(`/cart`)
        }
    },[address, cartItems.length, city,fullname, phone, props.history, state, userInfo, zip])

    return (
        <div className={classes.CheckOutScreen}>
            <form>
                <Grid container>
                    <Grid item md={6} className={classes.billing}>
                    <h1>Shipping Address</h1>
                        <TextInput value={fullname} onChange={(e)=>setFullname(e.target.value)} label="Full Name" id="fname" variant="outlined"></TextInput>
                        <TextInput value={address} onChange={(e)=>setAddress(e.target.value)} label="Address" id="adr" variant="outlined"></TextInput>
                        <TextInput value={city} onChange={(e)=>setCity(e.target.value)} label="City" id="city" variant="outlined"></TextInput>

                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                            <TextInput value={state} onChange={(e)=>setState(e.target.value)} label="State"  id="state" variant="outlined"></TextInput>
                            </Grid>
                            <Grid item md={6} xs={12}>
                            <TextInput value={zip} onChange={(e)=>setZip(e.target.value)} label="Zip Code" id="zip" variant="outlined"></TextInput>       
                            </Grid>
                        </Grid>
                        <TextInput value={phone} onChange={(e)=>setPhone(e.target.value)} label="Phone number" id="phone" variant="outlined"></TextInput> 
                        {paypal?<Paypal amount={cartItems.reduce((sum,prev)=> sum+prev.price,0)}></Paypal>:<BlackButton onclick={handlePaymentScreen} className={classes.Button}>Complete to checkout</BlackButton>  }         
                    </Grid>
                    <Grid item md={6} className={classes.billing}>
                    <h1>Cart</h1>
                    <Grid container className={classes.CartItemsDiv}>
                               {cartItems.map((entry,i)=>{
                                    return (
                                        <Grid container key={entry+i} className={classes.CartItems}>
                                        <Grid item md={6}>
                                            <img src={entry.img&&`data:image/jpeg;base64,${entry.img}`} alt={entry}></img>
                                        </Grid>
                                        <Grid item md={6}>
                                            <h3 className={classes.model}>{entry.model}</h3>
                                            <h2 className={classes.type}>{entry.type}</h2>
                                            <h2 className={classes.name}>{entry.name}</h2>
                                            <h2 className={classes.price}>${entry.price}</h2>
                                            <h3 className={classes.size}>EU{entry.size}</h3>
                                        </Grid>
                                        </Grid>
                                    )
                                })}
                                <Grid container  className={classes.CartItems}>
                                    <Grid item md={12}>
                                    <p className={classes.Total}>{cartItems.length>0?`Total: $${formatCurrency(cartItems.reduce((sum,prev)=> sum+prev.price,0))}`:""}</p>
                                    </Grid>
                                </Grid>
                        </Grid>         
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}
