import React from 'react'
import { PayPalButton } from "react-paypal-button-v2"
import Axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import {withRouter} from "react-router-dom"
import {deleteCart} from "../../actions/cartActions"

function Paypal(props) {
    const {userInfo} = useSelector(state => state.userLogin)
    const {cartItems} = useSelector(state => state.cart)
    const {shippingAddress} = useSelector(state => state.shippingAddress)
    const dispatch = useDispatch()

    async function sendData(){

            try{
                await Axios.post(`/api/v1/orders/newOrder`,
                {ShippingAddress:shippingAddress,OrderedProducts:cartItems}
                ,{
                    headers: {
                    'Authorization': `Bearer ${userInfo.token}` 
                  }}).then(()=>
                  {
                    props.history.push(`/orders`)
                      dispatch(deleteCart())
                    }
                  ).catch((error)=>{
                    alert(error)
                })
                
            }catch(error){
                console.error(error);
            }
        

    }
    
    return (
        <div style={{marginTop:"20px"}}>
            <PayPalButton
                amount={props.amount}
                onSuccess={ (details,data) => {
                    sendData()
                }}
            />
        </div>
    )
}
export default withRouter(Paypal)