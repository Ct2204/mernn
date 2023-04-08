import  axios from 'axios'
import {
    CREATE_ORDERS_REQUEST,
    CREATE_ORDERS_SUCCESS,
    CREATE_ORDERS_FALL,
    CLEAR_ERROR,

} from "../constants/orderConstant.js";





//My Orders
export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDERS_REQUEST })
        
        const data = await axios.get('/api/v1/orders/me')

        dispatch({
            type: CREATE_ORDERS_SUCCESS,
            payload:data.orders
        })

    } catch (error) {
        dispatch({
            type: CREATE_ORDERS_FALL,
            payload:error.response.data.message,
        })
    }
}




//Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({type:CLEAR_ERROR})
}