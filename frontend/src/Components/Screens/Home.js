import React, { useEffect} from 'react'
import classes from "./Home.module.css"
import {Grid} from "@material-ui/core"
import {useDispatch, useSelector} from "react-redux"
import {getNewArrivals} from "../../actions/homeActions"
import Loading from "../LittleComponents/Loading"

export default function Home(props) {
    const {newArrivals} = useSelector(state => state.homeActions)
    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(getNewArrivals())
    }, [dispatch])

    return (
        <div className={classes.MainDiv}>
            <div className={classes.background}>
                    <h1>GOT'EM</h1>
                    <h2>Buy authentic sneakers</h2>
            </div>
            <div className={classes.newArrivals}>
                <Grid container style={{justifyContent:"center",alignItems:"center"}}>
                    <Grid item lg={12}>
                        <h1>New arrivals</h1>
                    </Grid>
                    {
                    newArrivals&&newArrivals?
                    newArrivals.map((entry) =>{
                        return <Grid onClick={()=>props.history.push(`/sneakers/${entry.name}/${entry._id}`)} key={entry._id} item sm={12} lg={3} className={classes.images}>
                                    <img src={`data:image/jpeg;base64,${entry.img}`} className={classes.productImage} alt={entry.name}></img>
                                    <h3>{entry.model} {entry.type}</h3>
                                    <h2>{entry.name}</h2>
                               </Grid>
                    })
                    :<Loading></Loading>}
                   
                </Grid>
            </div>
            
        </div>
    )
}
