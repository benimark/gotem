import {applyMiddleware, combineReducers, createStore,compose} from "redux"
import thunk from 'redux-thunk'
import {cartReducer} from "./reducers/cartReducers"
import { getProductReducer, productDetailsReducer, productListReducer } from "./reducers/productReducers"
import { saveShippingAddressReducer } from "./reducers/saveShippingAddressReducer"
import { loginReducer,registerReducer } from "./reducers/userReducers"
import {orderReducer} from "./reducers/orderReducer"
import { getAllOrdersReducer, getAllUsersReducer, getUserReducer } from "./reducers/adminReducer"
import { homeReducer } from "./reducers/homeReducer"
const initialState = {
    cart:{
    cartItems:localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[],
    },
    userLogin:{
    userInfo:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
    }
}
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart:   cartReducer,
    userLogin: loginReducer,
    userRegister: registerReducer,
    shippingAddress: saveShippingAddressReducer,
    orderList:orderReducer,
    allorderList:getAllOrdersReducer,
    alluserList:getAllUsersReducer,
    user:getUserReducer,
    getProduct:getProductReducer,
    homeActions:homeReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)))

export default store;