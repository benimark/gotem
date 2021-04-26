import React, { useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {addToCart} from "../../actions/cartActions"
import {Grid} from "@material-ui/core"
import CartItem from "../Cart/CartItem"
import BlackButton from "../LittleComponents/BlackButton"
import Error from "../LittleComponents/Error"
import classes from "../Cart/CartScreen.module.css"
import formatCurrency from "format-currency"
import {removeItemFromCart} from "../../actions/cartActions"

export default function CartScreen(props) {
    const productId = props.match.params.id
    const size = props.location.search?Number(props.location.search.split("=")[1]):40
    const dispatch = useDispatch()
    const {cartItems} = useSelector(state => state.cart)

    const handleDeleteCartItem = (id,size) =>{
        dispatch(removeItemFromCart(id,size))
    }
    const checkOutHandler = () =>{
          props.history.push(`/login?redirect=checkout`)
    }

    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,size))
        }
        props.history.push(`/cart`)
    },[dispatch,productId,size,props.history])

    return (
        <Grid container className={classes.CartScreenDiv}>
            {cartItems.length>=1&&<Grid item xs={12} md={12}>
                {cartItems.map((entry,i) => {
                    return <CartItem key={entry+i} handleDelete={handleDeleteCartItem} id={entry.product} img={entry.img&&`data:image/jpeg;base64,${entry.img}`} model={entry.model} price={entry.price} type={entry.type} name={entry.name} size={entry.size} cond={entry.cond}></CartItem>
                })}
            </Grid>}
            {cartItems.length>0?<div></div>:<Error>Cart is empty</Error>}
            <Grid item xs={8} md={8}>
                <p className={classes.Total}>{cartItems.length>0?`Total: $${formatCurrency(cartItems.reduce((sum,prev)=> sum+prev.price,0))}`:""}</p>
            </Grid>
            <Grid item xs={12} md={4}>
               <BlackButton onclick={checkOutHandler} disabled={cartItems.length===0}>Check out</BlackButton>
            </Grid>
        </Grid>
    )
}
