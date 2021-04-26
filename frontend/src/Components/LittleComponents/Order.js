import React from 'react'
import classes from "./Order.module.css"
import {Grid} from "@material-ui/core"
import formatCurrency from "format-currency"
import $ from "jquery"

export default function Order(props) {
    const {ShippingAddress} = props.orderdata
    const {OrderedProducts} = props.orderdata

    const handleToggle = ()=>{
        $('#'+ShippingAddress[0]._id).slideToggle()
    }

    return (
        <div className={classes.Wrap}>
            <Grid container className={classes.order} onClick={handleToggle}>
                <Grid className={classes.status} md={2} xs={6} item style={{backgroundColor:props.sent?"green":"#bd3a3c",color:"white",height:"100%"}}>
                   <h2>{props.sent?"Sent":"We prepare your order"}</h2>
                </Grid>
                <Grid md={10} xs={6} item className={classes.date}>
                    <h1>{props.date}</h1>
                </Grid>
            </Grid>
            <Grid container id={ShippingAddress[0]._id} className={classes.details} style={{display:"none"}}>
                <Grid item md={3} xs={12} className={classes.shipping}>
                    <h1>Shipping Address</h1>
                    <p>{ShippingAddress[0].zip}, {ShippingAddress[0].state} {ShippingAddress[0].city} {ShippingAddress[0].address}</p>
                    <h1>Total Price</h1>
                    <p>${formatCurrency(OrderedProducts.reduce((sum,prev)=> sum+prev.price,0))}</p>
                </Grid>
                <Grid item md={3} xs={12} className={classes.personal}>
                    <h1>{ShippingAddress[0].fullname}</h1>
                    <p>{ShippingAddress[0].phone}</p>
                </Grid>
                <Grid item md={6}>
                {OrderedProducts.map((entry,i)=>{
                                    return (
                                        <Grid container key={entry+i} className={classes.CartItems}>
                                            <Grid item md={6} xs={6}>
                                                <img src={entry.img&&`data:image/jpeg;base64,${entry.img}`} alt={entry}></img>
                                            </Grid>
                                            <Grid item md={6} xs={6}>
                                                <h3 className={classes.model}>{entry.model}</h3>
                                                <h3 className={classes.type}>{entry.type}</h3>
                                                <h3 className={classes.name}>{entry.name}</h3>
                                                <h3 className={classes.price}>${entry.price}</h3>
                                                <h3 className={classes.size}>EU{entry.size}</h3>
                                            </Grid>
                                        </Grid>
                                    )
                  })}
                </Grid>
            </Grid>    
        </div>
    )
}
