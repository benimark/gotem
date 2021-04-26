import React, { useEffect, useState } from 'react'
import classes from "./LoginScreen.module.css"
import {StylesProvider} from "@material-ui/core/styles";
import BlackButton from '../LittleComponents/BlackButton';
import {Grid} from "@material-ui/core"
import {useDispatch,useSelector} from "react-redux"
import {login} from "../../actions/userActions"
import { Link } from 'react-router-dom';
import TextInput from '../LittleComponents/TextInput';

export default function LoginScreen(props) {
    const dispatch = useDispatch()
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const {userInfo,error} = useSelector(state => state.userLogin)
    const redirect = props.location.search? props.location.search.split("=")[1]:"/"

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect)
        }
    }, [props.history, redirect, userInfo])

    const logInHandler=(e)=>{
        e.preventDefault()
        dispatch(login(email,password))
    }
    
    return (
    <div style={{minHeight:"100vh"}}>
        <div className={classes.logInWindow}>
            <h1>GOT'EM</h1>
            <img src="./iconNike.png" alt="icon" width="180px" height="180px"></img>
            <form>
            <StylesProvider injectFirst>
            <TextInput error={error&&true} id="email" helperText={error&&"Invalid email or password"} onChange={(e)=>setemail(e.target.value)} label="Email address" variant="outlined"></TextInput>
            <TextInput id="password" onChange={(e)=>setpassword(e.target.value)} label="Password" type="password" variant="outlined"></TextInput>
            <BlackButton id="loginButton" onclick={logInHandler}>Log in</BlackButton>
            <Grid container style={{marginTop:"10px",marginBottom:"10px"}}>
                <Grid xs={12} md={6} item>
                    <Link to={redirect?`/signup?redirect=${redirect}`:"/signup"}><p>Sign up</p></Link>
                </Grid>
                <Grid xs={12} md={6} item>
                    <Link to="/forgotpassword"><p className={classes.forgotPassword}>Forgot password?</p></Link>
                </Grid>
            </Grid>
            </StylesProvider>
            </form>
        </div>
    </div>
    )
}
