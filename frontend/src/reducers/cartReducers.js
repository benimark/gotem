import { CART_ADD_ITEM,CART_REMOVE_ITEM, SAVE_SHIPPING_ADDRESS,DELETE_CART } from "../constants/cartConst";

export const cartReducer = (state={cartItems:[]},action)=>{
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItemWithTheseSize = state.cartItems.find(entry => entry.product === item.product && entry.size === item.size)
            if(existItemWithTheseSize){
                return {
                    ...state,
                    cartItems: state.cartItems.map(entry => entry.product === existItemWithTheseSize.product && entry.size === item.size? item: entry)
                }
            }else{
                return {
                    ...state,cartItems:[...state.cartItems,item]
                }
            }
        case DELETE_CART:
            return {...state,cartItems:[]}
        case CART_REMOVE_ITEM:
            const removedItem = state.cartItems.find(entry => entry.product === action.payload.productId && entry.size === action.payload.size)
            const cartItemsRemoved= state.cartItems.filter(entry =>  entry !== removedItem)
            return {
                ...state,
                cartItems: cartItemsRemoved
            }
        case SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        default:
            return state
    }
}