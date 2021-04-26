import Nav from "./Components/Navigation/Nav"
import Products from "./Components/Screens/Products"
import Container from "@material-ui/core/Container"
import {BrowserRouter,Route} from "react-router-dom"
import Home from "./Components/Screens/Home"
import ProductScreen from "./Components/Screens/ProductScreen"
import CartScreen from "./Components/Screens/CartScreen"
import {useSelector} from "react-redux"
import LoginScreen from "./Components/Screens/LoginScreen"
import SignUpScreen from "./Components/Screens/SignUpScreen"
import CheckOutScreen from "./Components/Screens/CheckOutScreen"
import OrdersScreen from "./Components/Screens/OrdersScreen"
import AdminScreen from "./Components/Screens/AdminScreen"
import UserScreen from "./Components/Screens/UserScreen"
import ProfileScreen from "./Components/Screens/ProfileScreen"
import NewProductScreen from "./Components/Screens/NewProduct"
import AdminProductScreen from "./Components/Screens/AdminProductScreen"
import PrivacyPolicy from "./Components/Screens/PrivacyPolicy"
import Terms from "./Components/Screens/Terms"
import ScrollToTop from "./Components/LittleComponents/ScrollToTop"

function App() {
  const cart = useSelector(state => state.cart)
  const {userInfo} = useSelector(state => state.userLogin)
  const {cartItems} = cart
  return (
    <BrowserRouter>
    <ScrollToTop />
    <Nav cartItemsLength={cartItems.length}></Nav>
    <Route exact path="/" component={Home}></Route>
    
    <Container maxWidth="lg" className="Container">
      {userInfo&&userInfo.isAdmin?<Route exact path="/adminpanel" component={AdminScreen}></Route>:null}
      {userInfo&&userInfo.isAdmin?<Route exact path="/adminpanel/user/:id" component={UserScreen}></Route>:null}
      {userInfo&&userInfo.isAdmin?<Route exact path="/adminpanel/products/:id" component={AdminProductScreen}></Route>:null}
      {userInfo&&userInfo.isAdmin?<Route exact path="/adminpanel/new/product" component={NewProductScreen}></Route>:null}
      <Route exact path="/profile" component={ProfileScreen}></Route>  
      <Route exact path="/orders" component={OrdersScreen}></Route>
      <Route exact path="/signup" component={SignUpScreen}></Route>
      <Route exact path="/login" component={LoginScreen}></Route>
      <Route exact path="/cart/:id?" component={CartScreen}></Route>
      <Route exact path="/sneakers/:name/:id" component={ProductScreen}></Route>  
      <Route exact path="/sneakers" component={Products}></Route>
      <Route exact path="/checkout" component={CheckOutScreen}></Route>
      <Route exact path="/privacy-policy" component={PrivacyPolicy}></Route>
      <Route exact path="/terms-and-conditions" component={Terms}></Route>
    </Container>
    
    </BrowserRouter>
  );
}

export default App;
