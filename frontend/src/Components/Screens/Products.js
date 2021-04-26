import React,{useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import Product from '../Products/Product'
import Loading from "../LittleComponents/Loading"
import "../Products/Products.css"
import Error from "../LittleComponents/Error"
import {useSelector,useDispatch} from "react-redux"
import { listProducts } from '../../actions/productActions'

export default function Products() {
    const dispatch = useDispatch()
    const productList = useSelector((state)=>state.productList)
    const {loading,error,products} = productList
    
    useEffect(()=>{
        dispatch(listProducts())
    },[dispatch])

    return (
        <div className="Products">
            <Grid container spacing={5}>
                {   loading?
                    <Loading></Loading>
                    :error? <Error>Can't connect to server</Error>:
                    products.map(product =>{
                        return <Product key={product._id} _id={product._id} model={product.model} img={product.img&&`data:image/jpeg;base64,${product.img}`} minprice={Math.min.apply(Math,product.sizes.prices)} name={product.name} type={product.type}
                         sizes={product.sizes}
                        ></Product>
                     })
                }
            </Grid>
        </div>
    )
}
