import {GET_ORDER_FAIL, GET_ORDER_REQUEST, GET_ORDER_SUCCESS} from "../constants/orderConsts"
import Axios from "axios"

export const getOrders = () => async(dispatch,getState) =>{
    dispatch({type:GET_ORDER_REQUEST})
    try {
        const {userLogin:{userInfo}} = getState()
        const {data} = await Axios.get(`/api/v1/orders/${userInfo._id}`)
        dispatch({type:GET_ORDER_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:GET_ORDER_FAIL,payload:error.response && error.response.data.errors ? error.response.data.errors : error.message})
    }
} 