import Axios from "axios"
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConst"
import {GET_PRODUCT_FAIL, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS} from "../constants/adminConst"

export const listProducts = () => async (dispatch)=>{
    dispatch({
        type: PRODUCT_LIST_REQUEST
    })
    try {
        const {data} = await Axios.get('/api/v1/products')
        dispatch({
            type: PRODUCT_LIST_SUCCESS, payload: data.products
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL, payload: error.message
        })
    }
}
export const detailsProducts = (productId,name) => async (dispatch)=>{
    dispatch({type: PRODUCT_DETAILS_REQUEST,payload: productId,name})
    try{
        const {data} = await Axios.get(`/api/v1/products/${name}/${productId}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,payload:data
        })
    }catch(error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}
export const getProductById = (id) => async(dispatch,getState)=>{
    dispatch({type: GET_PRODUCT_REQUEST})
    try {
        const {userLogin:{userInfo}} = getState()
        const {data} = await Axios.get(`/api/v1/products/${id}`,{headers:{
            'Authorization': `Bearer ${userInfo.token}`
        }})
        dispatch({type:GET_PRODUCT_SUCCESS,payload:data})
    } catch (error) {
        dispatch({
            type:GET_PRODUCT_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}