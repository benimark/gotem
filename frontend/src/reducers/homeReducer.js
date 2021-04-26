import { GET_NEW_ARRIVALS } from "../constants/homeConst"

export const homeReducer = (state={newArrivals:[]},action) =>{
    switch (action.type) {
        case GET_NEW_ARRIVALS:
            return {newArrivals:action.payload}
        default:
           return state
    }
}