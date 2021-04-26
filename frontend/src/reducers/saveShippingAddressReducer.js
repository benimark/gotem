import {SAVE_SHIPPING_ADDRESS} from "../constants/saveShippingConst"

export const saveShippingAddressReducer = (state={},action) =>{
    switch (action.type) {
        case SAVE_SHIPPING_ADDRESS:
            return {shippingAddress:action.payload}
        default:
            return state
    }
}