import { Fragment, useEffect } from "react";
import React from "react";
import {SlMouse} from 'react-icons/sl'

import './Home.css'
import './ProductCard.js'
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData.js";
import {clearErrors,getProduct} from '../../actions/productAction'
import {useSelector,useDispatch} from 'react-redux'
import Loader from "../layout/Loader/Loader.js";
import {useAlert} from 'react-alert'




function Home() {

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products, productsCount } = useSelector(
        state => state.products
    );

    
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct())
    },[dispatch,error,alert])



    return (<Fragment>
        {loading ? <Loader/> : (
            <Fragment>
                 <MetaData title='Home Working'/>

                <div className="banner">
                    <p>Welcom to Ecommere</p>
                    <h1>FIND AMAZING PRODUCTS BELOW</h1>

                    <a href="#container">
                        <button className='buttonScroll'>
                        Scroll <SlMouse/>
                        </button>
                    </a>
                </div>

                <h2 className="homeHeading">Featured Product</h2>

                <div className="container" id="container">
                    {products && products.map((product) => (
                    <ProductCard key={product.id} product={product} /> 
                    ))
                    }
                </div>
            </Fragment>
        )}

    </Fragment>)
}

export default Home;

