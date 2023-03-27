import { createStore, combineReducers, applyMiddleware } from 'redux'
// import {configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailsReducer, productReducer } from './reducers/productReducer.js';
import {profileReducer, userReducer} from './reducers/userReducer.js'
import { cartReducer } from './reducers/cartReducer.js';


const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    cart:cartReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store