import React,{useEffect,useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import Grid from '@material-ui/core/Grid'
import {Button} from "@material-ui/core"
import Loading from "../LittleComponents/Loading"
import Error from "../LittleComponents/Error"
import "../Products/ProductDetails.css"
import Dropdown from "../Forms/Dropdown"
import { detailsProducts } from '../../actions/productActions'
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {CSSTransition} from "react-transition-group"

export default function ProductScreen(props) {
    const dispatch = useDispatch()
    const productId = props.match.params.id
    const productName = props.match.params.name
    const productDetails = useSelector(state => state.productDetails)
    const {loading,error,product} = productDetails
    const [show,setShow] = useState(false)

    useEffect(()=>{
        dispatch(detailsProducts(productId,productName))
    },[dispatch,productId,productName])

    const showImagesHandler = () =>{
        if(show){
            setShow(false)
        }else{
            setShow(true)
        }
    }
    const addToCartHandler = () =>{
        const dropdown = document.querySelector(".MuiSelect-nativeInput");
        const size = dropdown.value;
        props.history.push(`/cart/${productId}?size=${size}`)
    }

    return (
        <div className="Products">
                {   loading?
                    <Loading></Loading>
                    :error? <Error>{error}</Error>:
            <Grid container spacing={3} className="ProductDetails">
                   
            <Grid item xs={12} md={7} lg={8} className="ProductScreenImageDiv">
               <img src={product.img&&`data:image/jpeg;base64,${product.img}`}className="ProductScreenImage" alt={product.name} width="100%"></img>
            </Grid>

            <Grid item xs={12} md={5} lg={4}>
                <div className="productName">
                <h1>{product.model} {product.type}</h1>
                <h1 className="NameH1">{product.name}</h1>
                </div>
 
                    {(product.sizes.sizes.length!==0)?
                     <Grid container>
                    <Grid xs={6} item>
                        <Dropdown entries={Object.entries(product.sizes)} sizes={product.sizes.sizes}></Dropdown>
                    </Grid>
                    <Grid xs={6} item>
                        <Button onClick={addToCartHandler} variant="contained" className="AddToCartButton">Add to cart</Button>
                    </Grid>
                    </Grid>
                    :
                    <Grid container>
                    <Button variant="contained" className="AddToCartButton disabled">Out of stock</Button>
                    </Grid>
                    }
                    
               
                <p className="ProductDescription">{product.description.front}</p>
                <p className="ProductDescription">{product.description.back}</p>
                {(product.images.length===0)?
                    <div></div>
                    :<IconButton aria-label="delete" onClick={showImagesHandler}>
                    More Image
                    <ExpandMoreIcon />
                </IconButton>
                }
                
                </Grid>

                {
                    show?
                    <CSSTransition
                    in={show}
                    appear={true}
                    timeout={500}
                    classNames="fade"
                    >

                    <Grid container spacing={3} className="productImages">
                       {(product.images)?
                       product.images.map(image =>
                       {
                       return <Grid item xs={12} key={image} md={6}>
                            <img src={`data:image/jpeg;base64,${image}`} style={{objectFit:"contain"}} alt={product.name} width="100%" height="100%"></img>
                        </Grid> 
                       }):<Error>This product has no more images</Error>}    
                     </Grid>
                     </CSSTransition>:
                     <div></div>
                }  
                       

             </Grid>
                }
        </div>
        
    )
}
