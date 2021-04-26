import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import Order from '../LittleComponents/Order'
import {getOrders} from "../../actions/ordersActions"
import Error from '../LittleComponents/Error'
import Loading from "../LittleComponents/Loading"
import moment from "moment"

export default function OrdersScreen(props) {
    const dispatch = useDispatch()
    const {userInfo} = useSelector(state => state.userLogin)
    const orderList = useSelector(state => state.orderList)  
    const {error,orderedItems,loading} = orderList

    useEffect(()=>{
        dispatch(getOrders())
    },[dispatch])

    useEffect(()=>{
        if(!userInfo){
            props.history.push(`/login`)
        }
    })

    return (
        <div style={{height:"100vh"}}>
            {error&&<Error>{error}</Error>}
            {orderedItems&&orderedItems.length===0&&<Error>You did not order anything yet.</Error>}
            {loading&&<Loading></Loading>}
            {
                orderedItems&&orderedItems.map(entry => {
                    return <Order orderdata={entry} sent={entry.sent} key={entry._id} date={moment(entry.createdAt).format('LLLL')}></Order>
                })
            }
        </div>
    )
}
