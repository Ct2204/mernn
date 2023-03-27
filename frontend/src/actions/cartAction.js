import { ADD_TO_CARD, REMOVE_CART_ITEM } from "../constants/cartConstants.js";
import axios from "axios";

//add to cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`)
    
    dispatch({
        type: ADD_TO_CARD,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.Stock,
            quantity
        }
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}


//remove to cart
export const removeItemsToCart = (id) => async (dispatch, getState) => {
   
    dispatch({
        type: REMOVE_CART_ITEM,
        payload:id,
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}