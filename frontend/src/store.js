import { createStore, combineReducers, applyMiddleware } from 'redux'
// import {configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { deleteProductReducer, newProductReducer, newReviewReducer, productDetailsReducer, productReducer,productsReducer } from './reducers/productReducer.js';
import {profileReducer, userReducer} from './reducers/userReducer.js'
import { cartReducer } from './reducers/cartReducer.js';
import { myOrdersReducer } from './reducers/orderReducer.js';


const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    cart: cartReducer,
    myOrders: myOrdersReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product:productReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {},
    }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store