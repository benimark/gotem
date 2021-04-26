import { GET_ALL_ORDERS_FAIL, GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS, GET_ALL_USERS_FAIL, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_USER_FAIL, GET_USER_REQUEST, GET_USER_SUCCESS, UPDATE_ORDER} from "../constants/adminConst"

export const getAllOrdersReducer = (state={loading:true,allOrders:[]},action)=>{
    switch (action.type) {
        case GET_ALL_ORDERS_REQUEST:
            return {}
        case GET_ALL_ORDERS_SUCCESS:
            return {allOrders:action.payload}
        case GET_ALL_ORDERS_FAIL:
            return {}
        case UPDATE_ORDER:
            return {
                allOrders:action.payload
            }
        default:
            return state
    }
}
export const getAllUsersReducer = (state={loading:true,allUsers:[]},action) =>{
    switch (action.type) {
        case GET_ALL_USERS_REQUEST:
            return {loading:true}
        case GET_ALL_USERS_SUCCESS:
            return {loading:false,allUsers:action.payload}
        case GET_ALL_USERS_FAIL:
            return {loading:false}
        default:
            return state
    }
}
export const getUserReducer = (state={loading:true,user:{}},action) =>{
    switch (action.type){
        case GET_USER_REQUEST:
            return {loading:true}
        case GET_USER_SUCCESS:
            return {loading:false,user:action.payload}
        case GET_USER_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}