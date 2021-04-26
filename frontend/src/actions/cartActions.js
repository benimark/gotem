import Axios from 'axios'
import {CART_ADD_ITEM,CART_REMOVE_ITEM, DELETE_CART, SAVE_SHIPPING_ADDRESS} from '../constants/cartConst'

export const addToCart = (productId,size)=>async(dispatch,getState)=>{
    const {data} = await Axios.get(`/api/v1/products/${productId}`)
    const sizeIndex = Object.entries(data.sizes)[0][1].indexOf(size)
    const sizePrice = Object.entries(data.sizes)[1][1][sizeIndex]
    const calculatedPrice = sizePrice
    dispatch({
        type: CART_ADD_ITEM,
        payload:{
            name: data.name,
            img: data.img,
            price: calculatedPrice,
            sizes: data.sizes,
            product: data._id,
            model: data.model,
            type: data.type,
            size
        }
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}
export const deleteCart = () => (dispatch) =>{
    dispatch({type:DELETE_CART})
    localStorage.removeItem('cartItems')
}
export const removeItemFromCart = (productId,size)=>(dispatch,getState)=>{
    dispatch({type:CART_REMOVE_ITEM,payload: {productId,size}})
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}
export const saveShippingAddress = (data) => (dispatch)=>{
    dispatch({type:SAVE_SHIPPING_ADDRESS,payload: data})
    localStorage.setItem('shippingAddress',JSON.stringify(data))
}