import axios from "axios";
import {GET_NEW_ARRIVALS} from "../constants/homeConst"

export const getNewArrivals = () => async(dispatch) =>{
    try {
        const {data} = await axios.get('/api/v1/other/newArrivals')
        dispatch({type:GET_NEW_ARRIVALS,payload:data})
    } catch (error) {
        console.log("Unable to get new Arrivals");
    }
}