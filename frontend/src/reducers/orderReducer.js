import { GET_ORDER_FAIL, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from "../constants/orderConsts"

export const orderReducer = (state={loading:true,orderedItems:[]},action)=>{
    switch (action.type) {
        case GET_ORDER_REQUEST:
            return {loading:true}
        case GET_ORDER_SUCCESS:
            return {loading:false,orderedItems:action.payload}
        case GET_ORDER_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}