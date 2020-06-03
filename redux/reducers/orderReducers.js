import {ADD_ORDERS, ORDERS, SHOW_ONE_ORDER_DETAILS} from "../../pages/partials/consts/actionsConstants";

const initialState = {
    orders: []
}

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {

        case ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        case ADD_ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        case SHOW_ONE_ORDER_DETAILS:
            return {
                ...state,
                orderDetails: action.payload
            }
        default:
            return state
    }
}