import React from 'react'
import './Products.css'
import { Fragment, useEffect } from "react";
import ProductCard from "../Home/ProductCard";
import {clearErrors,getProduct} from '../../actions/productAction'
import {useSelector,useDispatch} from 'react-redux'
import Loader from "../layout/Loader/Loader.js";
import {useAlert} from 'react-alert'


const Products = () => {
    const dispatch = useDispatch();

    const { products, loading, error, productsCount } = useSelector(state => state.products)
    
    useEffect(() => {
        dispatch(getProduct())

    },[dispatch])
  return (
      <Fragment>
          {loading ? <Loader /> : (
              <Fragment>
                  <h2 className="productsHeading">Products</h2>

                  <div className="products">
                      {
                          products && products.map(product => (
                              <ProductCard key={product._id} product={ product} />
                          ))
                      }
                  </div>
              </Fragment>
          )}
    </Fragment>
  )
}

export default Products