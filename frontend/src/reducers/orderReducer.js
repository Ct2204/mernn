import {
    CREATE_ORDERS_REQUEST,
    CREATE_ORDERS_SUCCESS,
    CREATE_ORDERS_FALL,
    CLEAR_ERROR,
} from "../constants/orderConstant.js";

export const myOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case CREATE_ORDERS_REQUEST:
            return {
                loading: true,
            }
        case CREATE_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            }
        case CREATE_ORDERS_FALL:
            return {
                loading:false,
                error:action.payload,
            }
        
            case CLEAR_ERROR: 
            return {
                ...state,
                error:null,
            }    
        
        default:
            return state;
    }
}
