import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from '../../actions/userActions'
import BlackButton from "../LittleComponents/BlackButton"

export default function ProfileScreen(props) {
    const {userInfo} = useSelector(state => state.userLogin)
    const dispatch = useDispatch()
    const logOutHandler=()=>{
        dispatch(signout())
      }

    useEffect(()=>{
        if(!userInfo){
            props.history.push('/')
        }
    },[props.history, userInfo])

    return (
        <div style={{height:"100vh"}}>
            <BlackButton onclick={()=>props.history.push(`/orders`)}>Orders</BlackButton>
            <BlackButton onclick={logOutHandler}>Log out</BlackButton>
        </div>
    )
}
