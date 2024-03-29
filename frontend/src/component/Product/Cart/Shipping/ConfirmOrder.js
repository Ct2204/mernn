import React, { Fragment } from 'react'
import './ConfirmOrder.css'
import CheckoutStep from './CheckoutStep.js'
import { useSelector } from 'react-redux'
import MetaData from '../../../layout/MetaData.js'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'

const ConfirmOrder = () => {
    const navigate = useNavigate()
    const {shippingInfo, cartItems} = useSelector(state=>state.cart)
    const { user } = useSelector(state => state.user)
    

    const subtotal = cartItems.reduce(
        (acc,item)=>acc + item.price * item.quantity,0
    )
    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * 0.18;
    
    const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country}`;

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate('/process/payment')
    }
    

    return (
        <Fragment>
          <MetaData title={'Order Confirm'} />

            <CheckoutStep activeStep={1}/>

            <div className="confirmOrderPage">
                <div>
                    <div className="confirmshippingArea">
                        <Typography>Shipping Info</Typography>
                        <div className="confirmshippingAreaBox">
                        <div>
                            <p>Name:</p>
                            <span>{user.name }</span>
                        </div>
                        
                        <div>
                            <p>PhoneNo:</p>
                            <span>{shippingInfo.phoneNo}</span>
                        </div>
                    
                        <div>
                            <p>Adress:</p>
                            <span>{address }</span>
                        </div>
                        </div>
                    </div>

                    <div className="confirmCartItems">
                    <Typography>Your Cart Items:</Typography>
                    <div className="confirmCartItemsContainer">
                        {       
                            cartItems && cartItems.map(item => (
                                <div key={item.product}>
                                    <img src={item.image} alt="Product" />
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>{' '}
                                    <span>
                                        {item.quantity} X {item.price} VND = {' '}
                                        <b>{item.quantity * item.price } VND</b>
                                    </span>
                                </div>
                            ))

                        }
                    </div>
                </div>
                </div>
                
                {/* {} */}
                <div>
                    <div className="orderSummary">
                        <Typography>Order Summery</Typography>
                        <div>
                            <div>
                                <p>Subtotal:</p>
                                <span>{subtotal} VND</span>
                            </div>
                            <div>
                                <p>Shipping Charhes:</p>
                                <span>{shippingCharges} VND</span>
                            </div>
                            <div>
                                <p>GST:</p>
                                <span>{tax} VND</span>
                            </div>
                        </div>

                        <div className="orderSummaryTotal">
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>{totalPrice } VND</span>
                        </div>

                        <button onClick={proceedToPayment}>Proceed to Payment</button>
                        </div>
                </div>
            </div>

         </Fragment>
  )
}

export default ConfirmOrder