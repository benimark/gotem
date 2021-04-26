import { GET_PRODUCT_FAIL, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS } from "../constants/adminConst";
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL} from "../constants/productConst";

export const productListReducer = (state={loading:true,products: []},action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading: true}
        case PRODUCT_LIST_SUCCESS:
            return {loading: false, products: action.payload}
        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}
export const productDetailsReducer = (state={product:{},loading:true},action)=>{
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {loading:true}
        case PRODUCT_DETAILS_SUCCESS:
            return {loading:false,product: action.payload}
        case PRODUCT_DETAILS_FAIL:
            return {loading:false,error: action.payload}
        default:
            return state
    }
}
export const getProductReducer = (state={loading:true,product:{}},action)=>{
    switch (action.type){
        case GET_PRODUCT_REQUEST:
            return {loading:true}
        case GET_PRODUCT_SUCCESS:
            return {loading:false,product:action.payload}
        case GET_PRODUCT_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}