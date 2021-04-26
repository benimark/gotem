import {USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConst"
import Axios from "axios"

export const login = (email,password) => async(dispatch)=>{
    dispatch({type:USER_LOGIN_REQUEST,payload:{email,password}})
    try{
        const {data} = await Axios.post(`/api/v1/users/signin`,{email,password})
        dispatch({type:USER_LOGIN_SUCCESS,payload:data})
        localStorage.setItem('userInfo',JSON.stringify(data))
    }catch(error){
        dispatch({type:USER_LOGIN_FAIL,payload:
            error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const signout = () => (dispatch)=>{
    const {token} = JSON.parse(localStorage.getItem('userInfo'))
    Axios.post(`/api/v1/users/logout`,null,{
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    dispatch({type:USER_LOGOUT})
}
export const register = (email,password,name) => async(dispatch)=>{
    dispatch({type:USER_REGISTER_REQUEST,payload:{email,password,name}})
    try {
        const {data} = await Axios.post(`/api/v1/users/signup`,{email,password,name})
        dispatch({type:USER_REGISTER_SUCCESS,payload:data})
        dispatch({type:USER_LOGIN_SUCCESS,payload:data})
        localStorage.setItem('userInfo',JSON.stringify(data))
    } catch (error) {
        dispatch({type:USER_REGISTER_FAIL,payload:
            error.response && error.response.data.errors ? error.response.data.errors : error.message
        })
    }
}
export const isLoggedIn = () => async(dispatch,getState)=>{
    try {
        const {userLogin:{userInfo}} = getState()
        const {data} = await Axios.get(`/api/v1/users/loginCheck`,{
            headers: {
            'Authorization': `Bearer ${userInfo.token}` 
          }})
          console.log(data);
          if(!data)
          {dispatch({type:USER_LOGOUT})}
          
    } catch (error) {
        console.error("Something went wrong!"+error);
    }
}