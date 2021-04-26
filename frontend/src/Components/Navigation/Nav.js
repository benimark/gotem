import React from 'react'
import "./nav.css"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {IconButton,Badge, ThemeProvider} from "@material-ui/core"
import {Link, withRouter} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import HomeIcon from '@material-ui/icons/Home'
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import {signout} from "../../actions/userActions"
import {BottomNavigation,BottomNavigationAction} from "@material-ui/core"
import classes from "./Nav.module.css"
import { theme } from '../Theme/Theme'

function Nav(props) {
  const {userInfo} = useSelector(state => state.userLogin)
  const [value, setValue] = React.useState(props.history.location.pathname.replace('/',''));
  const dispatch = useDispatch()

  const logOutHandler=()=>{
    dispatch(signout())
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (  
    <div>
      <div className="navbar">
        <Link to="/"><h1>GOT 'EM</h1></Link>
        <nav>
            <ul className="nav_links"> 
                <Link to="/"><li>Home</li></Link>
                <Link to="/sneakers"><li>Sneakers</li></Link>
                {userInfo&&userInfo.isAdmin&& <Link to="/adminpanel"><li>Admin Panel</li></Link>}
                {
                  userInfo?
                  <div className="dropdown">
                  <li>{userInfo.name}</li>
                  <div className="dropdown-content">
                      <Link to="/orders"><p className="dropdown-Item">Orders</p></Link>
                      <p className="dropdown-Item" onClick={logOutHandler}>Log out</p>
                     </div>
                  </div>
                  :
                  <Link to="/login"><li>Sign in</li></Link>
                }
                <li>
                <Link to="/cart">
                <IconButton to="/cart" className="checkout">
                <Badge badgeContent={props.cartItemsLength} color="secondary">
                <ShoppingCartIcon></ShoppingCartIcon>
                </Badge>
                </IconButton>  
                </Link>    
                </li>
            </ul>
        </nav>
      </div>
      <ThemeProvider theme={theme}>
      <BottomNavigation value={value} onChange={handleChange} className={classes.mobileNav}>
          <BottomNavigationAction onClick={()=>props.history.push('/')} label="Home" value="home" icon={<HomeIcon />} />
          <BottomNavigationAction onClick={()=>props.history.push('/sneakers')} label="Sneakers" value="sneakers" icon={<LocalOfferIcon/>} />
          <BottomNavigationAction onClick={()=>props.history.push('/cart')} label="Cart" value="cart" icon={<ShoppingCartIcon />} />
          {userInfo?<BottomNavigationAction onClick={()=>props.history.push('/profile')} label="Profile" value="profile" icon={<PersonIcon />} />:<BottomNavigationAction onClick={()=>props.history.push('/login')} label="Login" value="login" icon={<LockIcon />} />}
          {userInfo&&userInfo.isAdmin?<BottomNavigationAction onClick={()=>props.history.push('/adminpanel')} label="Admin" value="adminpanel" icon={<FormatAlignJustifyIcon />}/>:null}
       </BottomNavigation>
       </ThemeProvider>
    </div>
  );
}
export default withRouter(Nav);