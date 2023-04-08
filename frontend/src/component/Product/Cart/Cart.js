import React, { Fragment } from 'react'
import CartItemCard from './CartItemCard.js'
import {useDispatch,useSelector} from 'react-redux'
import './Cart.css'
import { Typography } from '@material-ui/core'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart.js'
import { Link,useNavigate } from 'react-router-dom'
import {addItemsToCart,removeItemsToCart} from '../../../actions/cartAction'

const Cart = () => {
  const nevigate = useNavigate()
  const dispatch = useDispatch()
  const {cartItems} = useSelector(state => state.cart)
 
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id,newQty))
  }
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id,newQty))
  }

  const deleteCartItems = (id) => {
    dispatch(removeItemsToCart(id))
  }

  const checkoutHandler = () => {
    nevigate('/login?redirect=shipping')
  }

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className='emptyCart'>
          <RemoveShoppingCartIcon />
          <Typography>
            No Product in your cart
          </Typography>
          <Link to='/products'>View Product</Link>
        </div>
      ) : (
        <Fragment>
        <div className="cartPage">
          <div className="cartHeader">
            <p>Product</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>
  
          {
            cartItems && cartItems.map(item => (
              <div className="cartContainer" key={item.product}>
              <CartItemCard item={item} deleteCartItems = {deleteCartItems} />
              <div className="cartInput">
                <button onClick={()=> decreaseQuantity(item.product,item.quantity)}>-</button>
                <input type="number" value={item.quantity} readOnly />
                <button onClick={()=> increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
              </div>
              <p className="cartSubTotal">
                {`${item.price*item.quantity} VND` }
              </p>
            </div>
            ))
          }      
          <div className="cartGrossProfit">
            <div></div>
            <div className="cartGrossProfitBox">
              <p>Gross total</p>
                  <p>{`${cartItems.reduce(
                (account,item)=>account + item.quantity*item.price,0)} VND`}</p>
            </div>
            <div></div>
            <div className="checkOutbtn">
              <button onClick={checkoutHandler}>Check Out</button>
            </div>
          </div>
        </div>
      </Fragment>
      )}
    </Fragment>
  )
}

export default Cart