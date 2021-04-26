import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import Axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import classes from "./UserScreen.module.css"
import Loading from "../LittleComponents/Loading"
import {Grid} from "@material-ui/core"
import moment from "moment"
import Error from "../LittleComponents/Error"
import BlackButton from "../LittleComponents/BlackButton"
import { getUser } from '../../actions/adminActions'

export default function UserScreen(props) {
    const {id} = useParams()
    const {userInfo} = useSelector(state => state.userLogin)
    const {user,error,loading} = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getUser(id))
    },[dispatch, id])

    useEffect(()=>{
        if(!userInfo || !userInfo.isAdmin){
            props.history.push(`/`)
        }
    })

    const setToAdmin = async() => {
       await Axios.post(`/api/v1/users/${id}/setadmin`,null,{headers: {
           'Authorization': `Bearer ${userInfo.token}`
       }})
       dispatch(getUser(id))
    }
    const deleteUser = async() => {
        await Axios.delete(`/api/v1/users/${id}`,{headers: {
            'Authorization': `Bearer ${userInfo.token}`
        }}).then(()=>{
            props.history.push("/adminpanel")
        })
        dispatch(getUser(id))
     }

    return (
        <div className={classes.mainDiv}>{userInfo&&userInfo.isAdmin&loading&loading?<Loading></Loading>:user?
            <Grid container>
                <Grid item md={6}>
                    <h1>{user.name}{user.isAdmin?<span className={classes.AdminBadge}>Admin</span>:null}</h1>
                    <p className={classes.id}>#{user._id}</p>
                    <table>
                        <tbody>
                        <tr>
                            <th>Email address</th>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <th>Account created</th>
                            <td>{moment(user.createdAt).format('LLLL')}</td>
                        </tr>
                        <tr>
                            <th>Orders</th>
                            <td>{user.orders.length}</td>
                        </tr>
                        <tr>
                            <th>Device logged</th>
                            <td>{user.tokens.length}</td>
                        </tr>
                        <tr>
                            <th>Admin</th>
                            <td>{user.isAdmin?"Yes":"No"}</td>
                        </tr>
                        </tbody>
                    </table>
                </Grid>
                <Grid item md={12} lg={6} style={{marginTop:"auto"}}>
                    <BlackButton onclick={()=>props.history.push(`/adminpanel?search=${user._id}`)}>Show orders</BlackButton>
                    {userInfo&&userInfo.isMainAdmin? <div><BlackButton onclick={setToAdmin}>{user.isAdmin?"Delete admininistrator":"Set to administrator"}</BlackButton>
                    <BlackButton onclick={deleteUser}>Delete user</BlackButton></div>:null}
                </Grid>
            </Grid>:<Error>{error}</Error>}
        </div>
    )
}
