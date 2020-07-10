import {
    PRODUCTS,
    PRODUCTS_DESCRIPTIONS,
    ADD_PRODUCTS,
    SALE_PRODUCTS,
    CHECK_ORDERS_ACCESS, CHECK_STORAGE_ACCESS
} from "../../pages/partials/consts/actionsConstants";

const initialState = {
    products: [],
    productsDescriptions: [],
}

export const productsReducer = (state = initialState, action) => {
    let products = [];
    switch (action.type) {

        case PRODUCTS:
            return {
                ...state,
                products: action.products
            }
        case PRODUCTS_DESCRIPTIONS:
            return {
                ...state,
                productsDescriptions: action.payload
            }
        case ADD_PRODUCTS :
            return {
                ...state,
                products: {
                    ...state.products,
                    data: [...state.products.data, ...action.products.data]
                }
            }
        case SALE_PRODUCTS:
            products = state.products.data;//array
            let soldProductsIds = Object.keys(action.payload.data);
            soldProductsIds = soldProductsIds.map(item => {
                return Number(item);//convert array of string to array of numbers
            });

            products.filter(item => {
                if (soldProductsIds.includes(item.id)) {
                    item.exist_count = Number(item.exist_count) - Number(action.payload.data[item.id].count);
                }
            });

            return {
                ...state,
                products: {data: products}
            }
        case CHECK_STORAGE_ACCESS:
            return {
                ...state,
                storageAccess: action.payload
            }

        default:
            return state
    }
}