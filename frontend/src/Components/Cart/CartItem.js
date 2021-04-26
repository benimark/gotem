import React from 'react'
import classes from "./CartItem.module.css"
import {Grid} from "@material-ui/core"
import DeleteIcon from '@material-ui/icons/Delete';
import formatCurrency from "format-currency"

export default function CartItem(props) {
    return (
         <div className={classes.CartItem}>
        <Grid container>
            <Grid md={2} sm={2} item>
                <img src={props.img} alt={props.name}></img>
            </Grid>
            <Grid md={6} sm={6} item className={classes.labels}>
                <h3>{props.model}</h3>
                <h1>{props.type}</h1>
                <h1>{props.name}</h1>
            </Grid>
            <Grid md={3} sm={3} item className={classes.sizePrice}>
                <p>${formatCurrency(Math.round(props.price))}</p>
                <p>{props.size}EU</p>
                <p>{props.cond}DSTW</p>
            </Grid>
            <Grid md={1} sm={1} onClick={()=>props.handleDelete(props.id,props.size)} item className={classes.IconGrid}>
                <DeleteIcon className={classes.DeleteIcon}></DeleteIcon>
            </Grid>
        </Grid>
         </div>
    )
}
