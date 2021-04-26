import {SAVE_SHIPPING_ADDRESS} from "../constants/saveShippingConst"
export const saveshippingAddress = (data) => (dispatch) =>{
    dispatch({type:SAVE_SHIPPING_ADDRESS,payload: data})
}