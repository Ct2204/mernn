import React, { Fragment, useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import {useSelector,useDispatch} from 'react-redux'
import {clearErrors, getProductDetails, newReview} from '../../actions/productAction'
import { useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component'
import ReviewCard from './ReviewCard.js'
import Loader from "../layout/Loader/Loader.js";
import {useAlert} from 'react-alert'
import MetaData from '../layout/MetaData.js'
import { addItemsToCart } from '../../actions/cartAction'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core"
import {Rating} from '@material-ui/lab'
import { NEW_REVIEW_RESET } from '../../constants/productConstants.js'

const ProductDetails = () => {


  const [quantity,setQuantity] =useState(1)
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment,setComment] = useState('')

  const dispatch = useDispatch();
  const alert = useAlert()
  const { id } = useParams();
  console.log(id)
  const {product,loading,error} = useSelector((state) => state.productDetails);
  const {success,error: reviewError} = useSelector(state=>state.newReview)

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity -1
    setQuantity(qty)
  }
  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity +1
    setQuantity(qty)
  }

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity))
    alert.success('Item added to Cart')
  } 


  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true)
  }

  const submitReviewHandler = () => {
    const myForm = new FormData()

    myForm.set('rating', rating)
    myForm.set('comment', comment)
    myForm.set('productId', id)
    
    dispatch(newReview(myForm))

    setOpen(false)
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if (reviewError) {
      alert.error(reviewError)
      dispatch(clearErrors())
    }
    if (success) {
      alert.success("Review Submitted Successfully")
      dispatch({type:NEW_REVIEW_RESET})
    }

      dispatch(getProductDetails(id))
    }, [dispatch, id,error,alert,success,reviewError])
    
    const options = {
      edit: false,
      color: 'rgba(20,20,20,0.1)',
      activeColor: 'tomato',
      size: window.innerWidth < 600 ? 20 : 25,
      value: product.ratings,
      isHaft: true,
  }

    
  
    return (
      <Fragment>
        <MetaData title={ `${product.name} ECOMMERCE`} />

        {loading ? <Loader /> : (
          <Fragment>
          <div className="ProductDetails">
          <div>
            
            <Carousel>
              
              {
                product.images && 
                product.images.map((item, i) => (
                  <img
                  className='CarouselImage'
                  key={item.url}
                  src={item.url}
                  alt={`${i} side`} />)
                  )}
           
                  </Carousel>
          </div>
          <div>
            <div className='detailsBlock-1'>
              <h2>{product.name}</h2>
              <p>Product # {product._id }</p>
            </div>
            <div className="detailsBlock-2">
              <ReactStars {...options} />
              <span>{product.numOfReviews } Reviews</span>
            </div>
            <div className="detailsBlock-3">
              <h1>{product.price} VND</h1>
              
            </div>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                <input  readOnly type="number" value={quantity}/>
                <button onClick={increaseQuantity}>+</button>
              </div>
              <button onClick={addToCartHandler}>Add to cart</button>
            </div>
            <div className='status'>
            <p>
              Status: 
              <b className={product.Stock < 1 ? 'redColor' : 'greenColor'}>
                {product.Stock < 1 ? 'OutOfStock' : 'InStock'}
              </b>
            </p>
            </div>
            <div className="detailsBlock-4">
              Decription : <p>{product.description }</p>
            </div>
            <button className='submitReview' onClick={submitReviewToggle}>Submit Review</button>
          </div>
          </div>

        <h3 className='reviewsHeading'>REVIEWS</h3>

            <Dialog
              aria-labelledby='simple-dialog-title'
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent className='submitDialog'>
                <Rating
                  onChange={e => setRating(e.target.value)}
                  value={rating}
                  size="large"
                />

                <textarea
                  className='submitDialogTextArea'
                  cols='30'
                  rows='5'
                  value={comment}
                  onChange={e=>setComment(e.target.value)}
                ></textarea>
              </DialogContent>
              <DialogActions>
                <Button color='secondary' onClick={submitReviewToggle}>Cancel</Button>
                <Button color='primary' onClick={submitReviewHandler}>Submit</Button>
              </DialogActions>
            </Dialog>    
        
        {
          product.reviews && product.reviews[0] ? (
            <div className='reviews'>
              {product.reviews && product.reviews.map(
                review => <ReviewCard review={ review} />
             )} 
            </div>
          ) : (
              <p className="noReviews">No Reviews Yet</p>
          )
        }
      </Fragment>
        )}
      </Fragment>
    )
  }

export default ProductDetails;