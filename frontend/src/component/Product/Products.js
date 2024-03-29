import React, { useState } from 'react'
import './Products.css'
import { Fragment, useEffect } from "react";
import ProductCard from "../Home/ProductCard";
import {clearErrors,getProduct} from '../../actions/productAction'
import {useSelector,useDispatch} from 'react-redux'
import Loader from "../layout/Loader/Loader.js";
import Pagination from 'react-js-pagination'
import { useParams } from 'react-router';
import {Slider,Typography} from '@mui/material'
import {useAlert} from 'react-alert'
import MetaData from '../layout/MetaData.js';



const categories = [
    "Laptop",
    "SmartPhones",
    "Bàn Phím",
    "Chuột",
    "Màn Hình",
    "Case Máy Tính",
]


const Products = () => {

    const alert = useAlert();


    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 25000])
    const [category,setCategory] = useState('')
    const [ratings, setRatings] = useState(0)
    


    const { products, loading, error, productsCount, resultPerPage } = useSelector(state => state.products)

   
   
    const {keyword} = useParams(); 

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
    }


    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
            
        }
        dispatch(getProduct(keyword,currentPage,price,category,ratings))

    }, [dispatch, keyword,currentPage,price,category,ratings,error,alert])
   
  return (
      <Fragment>
          {loading ? <Loader /> : (
              <Fragment>
                  <MetaData title="Products"/>

                  <h2 className="productsHeading">Products</h2>

                  <div className="products">
                      {
                          products && products.map(product => (
                              <ProductCard key={product._id} product={ product} />
                          ))
                      }
                  </div>

                  <div className="filterBox">
                      <Typography>Price</Typography>
                      <Slider
                          value={price}
                          onChange={priceHandler}
                          valueLabelDisplay='auto'
                          aria-labelledby='range-slider'
                          min={0}
                          max={25000}
                      />
                      <Typography>
                          Categories
                      </Typography>
                      <ul className="categoryBox">
                          {categories.map(category => (
                              <li
                                  className='category-link'
                                  key={category}
                                  onClick={()=>setCategory(category)}
                              >
                                  {category}
                              </li>
                          ))}
                      </ul>

                      <fieldset>
                          <Typography component="legend">Ratings Above</Typography>
                          <Slider
                              value={ratings}
                              
                              onChange={(e, newRating) => {
                                  setRatings(newRating)
                              }}
                              valueLabelDisplay='auto'
                              aria-labelledby='continuous-slider'
                              min={0}
                              max={5}
                              
                          />
                      </fieldset>
                  </div>


                  {resultPerPage < productsCount && (
                       <div className="paginationBox">
                       <Pagination
                           activePage={currentPage}
                           itemsCountPerPage={resultPerPage}
                           totalItemsCount={productsCount}
                           onChange={setCurrentPageNo}
                           nextPageText='Next'
                           prevPageText='Prev'
                           firstPageText='1st'
                           lastPageText='Last' 
                           itemClass="page-item"
                           linkClass="page-link"
                           activeClass="pageItemActive"
                           activeLinkClass="pageLinkActive"
                       />
                   </div>
                 )}
              </Fragment>
          )}
    </Fragment>
  )
}

export default Products