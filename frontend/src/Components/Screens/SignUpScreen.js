import React, {useEffect, useState } from 'react'
import classes from "./LoginScreen.module.css"
import {StylesProvider} from "@material-ui/core/styles";
import BlackButton from '../LittleComponents/BlackButton';
import {Grid} from "@material-ui/core"
import {useDispatch,useSelector} from "react-redux"
import {register} from "../../actions/userActions"
import { Link } from 'react-router-dom';
import TextInput from '../LittleComponents/TextInput';

export default function SignUpScreen(props) {
    const dispatch = useDispatch()
    const [name,setname] = useState('')
    const [email, setemail] = useState('')
    const [passwordagain,setpasswordagain] = useState('')
    const [password, setpassword] = useState('')
    var {error} = useSelector(state => state.userRegister)
    const {userInfo} = useSelector(state => state.userLogin)
    const redirect = props.location.search? props.location.search.split("=")[1]:"/"
    
    const registerInHandler=(e)=>{
        e.preventDefault()
        if(password!==passwordagain){
            alert("Passwords not match!")
        }else{
            dispatch(register(email,password,name))
        }
    }

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect)
        }
    }, [props.history, redirect, userInfo])

    return (
    <div style={{minHeight:"100vh"}}>
        <div className={classes.singUpWindow}>
            <h1>GOT'EM</h1>
            <h2>Create a new account</h2>
            <form>
            <StylesProvider injectFirst>
            <TextInput required={true} error={error&&error.name&&true} id="name" helperText={error&&error.name?error.name.message:""} onChange={(e)=>setname(e.target.value)} label="Name" variant="outlined"></TextInput>
            <TextInput required={true} error={error&&error.email&&true} id="email" helperText={error&&error.email?error.email.message:""} onChange={(e)=>setemail(e.target.value)} label="Email" variant="outlined"></TextInput>
            <TextInput type="password" required={true} error={(error&&error.password&&true) || password!==passwordagain} id="password" helperText={error&&error.password?error.password.message:""} onChange={(e)=>setpassword(e.target.value)} label="Password" variant="outlined"></TextInput>
            <TextInput type="password" required={true} error={password!==passwordagain} id="passwordagain" helperText={password!==passwordagain?"Passwords not match!":""} onChange={(e)=>setpasswordagain(e.target.value)} label="Password again" variant="outlined"></TextInput>
            <BlackButton id="signupButton" onclick={registerInHandler}>Sign up</BlackButton>
            <Grid container>
                <Grid sm={6} item>
                <Link to="/login"><p>Log in</p></Link>
                </Grid>
            </Grid>
            </StylesProvider>
            </form>
        </div>
    </div>
    )
}
