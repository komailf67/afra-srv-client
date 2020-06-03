import {
    ADD_TO_PRODUCTS_LIST, ADD_TO_STORAGE,
    PRODUCTS_LIST,
    SELECTED_PRODUCTS,
    SELECTED_PRODUCTS_LIST_FOR_STORAGE,
    SELECTED_PRODUCTS_LIST_FOR_PRE_INVOICE, ADD_TO_PRE_INVOICE
} from "../../pages/partials/consts/actionsConstants";

const initialState = {
    productsList: [],
}

export const productsListReducer = (state = initialState, action) => {
    let products = [];
    switch (action.type) {

        case PRODUCTS_LIST:
            return {
                ...state,
                productsList: action.payload
            }

        case ADD_TO_PRODUCTS_LIST :
            products = state.productsList.data;
            let newProduct = action.payload.data;

            if (products.length == 0) {
                products.push(newProduct);
            } else {
                products.unshift(newProduct);
            }

            return {
                ...state,
                productsList: {data: products},
                newProductsList: action.payload
            }
        case SELECTED_PRODUCTS_LIST_FOR_STORAGE:
            return {
                ...state,
                selectedProducts: action.payload
            }
        case SELECTED_PRODUCTS_LIST_FOR_PRE_INVOICE:
            return {
                ...state,
                selectedProductsForPreInvoice: action.payload
            }
        case ADD_TO_STORAGE :
            return {
                ...state,
                addedToStorage: action.payload
            }
        case ADD_TO_PRE_INVOICE :
            return {
                ...state,
                addedToPreInvoice: action.payload
            }
        default:
            return state
    }
}