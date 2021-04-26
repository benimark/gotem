import React from 'react'
import Grid from '@material-ui/core/Grid'
import {Link} from "react-router-dom"

export default function Product(props) {
    return (
        <Grid item xs={12} sm={6}  md={4} lg={3}>
        <div className="Product">
            <Link to={`/sneakers/${props.name}/${props._id}`}>
            <div className="Product_Image_Div"><img src={props.img} alt="Shoe" width="100%"/></div>
            <h2 className="Product_model">{props.model} {props.type}</h2>
            <h2>{props.name}</h2>
            <h2 className="Product_price">${props.minprice}</h2>
            </Link>
        </div>
        </Grid>
    )
}
