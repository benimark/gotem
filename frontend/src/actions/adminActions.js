import {GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_FAIL, GET_ALL_ORDERS_SUCCESS, UPDATE_ORDER, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_ALL_USERS_FAIL,GET_USER_REQUEST,GET_USER_SUCCESS, GET_USER_FAIL} from "../constants/adminConst"
import Axios from "axios"

export const getOrders = (query) => async(dispatch,getState) =>{
    dispatch({type:GET_ALL_ORDERS_REQUEST})
    try {
        const {userLogin:{userInfo}} = getState()
        const {data} = await Axios.get(`/api/v1/orders`,{headers: {
            'Authorization': `Bearer ${userInfo.token}`,
            'type':query
        }})
        
        dispatch({type:GET_ALL_ORDERS_SUCCESS,payload:data})
              
    } catch (error) {
        dispatch({type:GET_ALL_ORDERS_FAIL,payload:error.response && error.response.data.errors ? error.response.data.errors : error.message})
    }
}
export const updateOrders = (id) => async(dispatch,getState) =>{
        const {allorderList:{allOrders}} = getState()
        const updatedOrders = allOrders.filter(entry => entry._id!==id)
        dispatch({type:UPDATE_ORDER,payload:updatedOrders})
}

export const getUserList = () => async(dispatch,getState) =>{
    dispatch({type:GET_ALL_USERS_REQUEST})
    try {
        const {userLogin:{userInfo}} = getState()
        const {data} = await Axios.get(`/api/v1/users/list`,{headers: {
            'Authorization': `Bearer ${userInfo.token}`
        }})
        
        dispatch({type:GET_ALL_USERS_SUCCESS,payload:data})
              
    } catch (error) {
        dispatch({type:GET_ALL_USERS_FAIL,payload:error.response && error.response.data.errors ? error.response.data.errors : error.message})
    }
}
export const getUser = (id) => async(dispatch,getState) =>{
    dispatch({type:GET_USER_REQUEST})
    try {
        const {userLogin:{userInfo}} = getState()
        const {data} = await Axios.get(`/api/v1/users/${id}`,{headers:{
            'Authorization': `Bearer ${userInfo.token}`
        }})
        dispatch({type:GET_USER_SUCCESS,payload:data})

    } catch (error) {
        dispatch({type:GET_USER_FAIL,payload:error.response && error.response.data.errors ? error.response.data.errors : error.message})
    }
}