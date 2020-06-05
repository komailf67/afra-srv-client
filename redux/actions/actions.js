import {
    PRODUCTS,
    ORDERS,
    CATEGORIES,
    ADD_PRODUCTS,
    IS_FORM_SUBMITTED,
    IS_OPEN_MODAL,
    SELECTED_PRODUCTS,
    SALE_PRODUCTS,
    MESSAGE_SHOWED,
    SALES_INVOICES,
    SOLD_PRODUCTS,
    PRODUCTS_DESCRIPTIONS,
    SALE_INVOICE_TO_SHOW,

    ADD_ORDERS,
    SHOW_ONE_ORDER_DETAILS,
    PRODUCTS_LIST,
    ADD_TO_PRODUCTS_LIST,
    ADD_TO_STORAGE,
    SELECTED_PRODUCTS_LIST_FOR_STORAGE,
    SELECTED_PRODUCTS_LIST_FOR_PRE_INVOICE,
    ADD_TO_PRE_INVOICE,
    PRE_INVOICES,
    SHOW_ONE_PRE_INVOICE_DETAILS
} from '../../pages/partials/consts/actionsConstants.js';
import axios from 'axios';
import {IS_TOKEN_VALID, TOKEN_DOES_NOT_VALID} from "../../pages/partials/consts/actionsConstants";


// Actions
export const isTokenValid = (success) => {
    return {
        type: IS_TOKEN_VALID,
        payload: success
    }
};

export const tokenDoesNotValid = (success) => {
    return {
        type: TOKEN_DOES_NOT_VALID,
        payload: success
    }
};

export const addOrder = (order) => {
    return {
        type: ADD_ORDERS,
        payload: order
    }
}

export const orders = (orders) => {
    return {
        type: ORDERS,
        payload: orders
    }
}

export const showOneOrderDetails = (order) => {
    return {
        type: SHOW_ONE_ORDER_DETAILS,
        payload: order
    }
}

export const showOnePreInvoiceDetails = (preInvoice) => {
    return {
        type: SHOW_ONE_PRE_INVOICE_DETAILS,
        payload: preInvoice
    }
}

export const productsList = (productsList) => {
    return {
        type: PRODUCTS_LIST,
        payload: productsList
    }
}

export const addToProductsList = (newProduct) => {
    console.log(newProduct)
    return {
        type: ADD_TO_PRODUCTS_LIST,
        payload: newProduct
    }
}

export const selectedProductsList = (selectedProductsIds) => {
    return {
        type: SELECTED_PRODUCTS_LIST_FOR_STORAGE,
        payload: selectedProductsIds
    }
}

export const selectedProductsListForPreInvoice = (selectedProductsIds) => {
    return {
        type: SELECTED_PRODUCTS_LIST_FOR_PRE_INVOICE,
        payload: selectedProductsIds
    }
}

export const addToStorage = (products) => {
    return {
        type: ADD_TO_STORAGE,
        payload: products
    }
}

export const addToPreInvoice = (products) => {
    return {
        type: ADD_TO_PRE_INVOICE,
        payload: products
    }
}

export const preInvoices = (preInvoices) => {
    return {
        type: PRE_INVOICES,
        payload: preInvoices
    }
}


export const products = (products) => {
    return {
        type: PRODUCTS,
        products
    }
}

export const productsDescriptions = (productsDescriptions) => {
    return {
        type: PRODUCTS_DESCRIPTIONS,
        payload: productsDescriptions
    }
}

export const categories = (categories) => {
    return {
        type: CATEGORIES,
        categories
    }
}

export const addProduct = (products) => {
    return {
        type: ADD_PRODUCTS,
        products
    }
}

export const isFormSubmitted = (success) => {
    return {
        type: IS_FORM_SUBMITTED,
        success
    }
}

export const salesInvoices = (salesInvoices) => {
    return {
        type: SALES_INVOICES,
        salesInvoices
    }
}

export const saleInvoiceToShow = (id) => {
    return {
        type: SALE_INVOICE_TO_SHOW,
        payload: id
    }
}

export const isOpenModal = (trueOrFalse) => {
    return {
        type: IS_OPEN_MODAL,
        trueOrFalse
    }
}

export const selectedProducts = (selectedProductsIds) => {
    return {
        type: SELECTED_PRODUCTS,
        selectedProductsIds
    }
}

/**
 *
 * @param {*} saleProducts
 * for list of products that selected for sale(in modal)
 */
export const saleProducts = (saleProducts) => {
    return {
        type: SALE_PRODUCTS,
        payload: saleProducts
    }
}

/**
 *
 * @param {*} saleProducts
 * for list of products that sold
 */
export const soldProducts = (soldProducts) => {
    return {
        type: SOLD_PRODUCTS,
        payload: soldProducts
    }
}

export const messageShowed = (trueOrFalse) => {
    return {
        type: MESSAGE_SHOWED,
        payload: trueOrFalse
    }
}

export function dispatchActions(url, actionType, data) {
    return (dispatch) => {

        switch (actionType) {
            case IS_TOKEN_VALID:
                axios.get(url, data)
                    .then((response) => {
                        console.log('aaaaaaaaaaaaaaaaaaa', response)
                        let {success, message} = response.data;
                        if (success) {
                            dispatch(isTokenValid(success))
                        } else {
                            dispatch(tokenDoesNotValid(success))
                        }
                    }).catch(e => {
                    console.log(e);
                })
                break;

            case ADD_ORDERS:
                axios.post(url, data)
                    .then((response) => {
                        dispatch(isFormSubmitted(response.data.success))
                        dispatch(addProduct(response.data))
                    }).catch(e => {
                    console.log(e);
                })
                break;
            case ORDERS:
                axios.get(url)
                    .then((response) => {
                        dispatch(orders(response.data))
                        return response;
                    })
                break;
            case SHOW_ONE_ORDER_DETAILS:
                axios.get(url)
                    .then((response) => {
                        dispatch(showOneOrderDetails(response.data))
                        return response;
                    })
                break;

            case SHOW_ONE_PRE_INVOICE_DETAILS:
                axios.get(url)
                    .then((response) => {
                        dispatch(showOnePreInvoiceDetails(response.data))
                        return response;
                    })
                break;

            case PRODUCTS_LIST:
                axios.get(url)
                    .then((response) => {
                        dispatch(productsList(response.data))
                        return response;
                    })
                break;
            case ADD_TO_PRODUCTS_LIST:
                axios.post(url, data)
                    .then((response) => {
                        dispatch(isFormSubmitted(response.data.success))
                        dispatch(addToProductsList(response.data))
                    })
                    .then(() => {
                        dispatch(messageShowed(0));
                    })
                    .catch(e => {
                        console.log(e);
                    })
                break;
            case SELECTED_PRODUCTS_LIST_FOR_STORAGE:
                axios.post(url, data)
                    .then((response) => {
                        dispatch(selectedProductsList(response.data))
                        return response;
                    }).then(() => {
                    dispatch(isOpenModal(1));
                })
                break;
            case SELECTED_PRODUCTS_LIST_FOR_PRE_INVOICE:
                axios.post(url, data)
                    .then((response) => {
                        dispatch(selectedProductsListForPreInvoice(response.data))
                        return response;
                    }).then(() => {
                    dispatch(isOpenModal(1));
                })
                break;

            case ADD_TO_STORAGE:
                axios.post(url, data)
                    .then((response) => {
                        dispatch(addToStorage(response.data))
                    })
                    .then(() => {
                        dispatch(messageShowed(0));
                        dispatch(isOpenModal(0));
                    })
                    .catch(e => {
                        console.log(e);
                    })
                break;

            case ADD_TO_PRE_INVOICE:
                axios.post(url, data)
                    .then((response) => {
                        dispatch(addToPreInvoice(response.data))
                    })
                    .then(() => {
                        dispatch(messageShowed(0));
                        dispatch(isOpenModal(0));
                    })
                    .catch(e => {
                        console.log(e);
                    })
                break;
            case PRE_INVOICES:
                axios.get(url)
                    .then((response) => {
                        dispatch(preInvoices(response.data))
                        return response;
                    })
                break;


            case PRODUCTS:
                axios.get(url)
                    .then((response) => {
                        dispatch(products(response.data))
                        return response;
                    })
                break;
            case PRODUCTS_DESCRIPTIONS:
                axios.get(url)
                    .then((response) => {
                        dispatch(productsDescriptions(response.data))
                        return response;
                    })
                break;
            case CATEGORIES:
                axios.get(url)
                    .then((response) => {
                        dispatch(categories(response.data))
                        return response;
                    })
                break;
            case ADD_PRODUCTS:
                axios.post(url,
                    {
                        data
                        // headers: {
                        //   "Access-Control-Allow-Origin": "*"
                        // }
                    })
                    .then((response) => {
                        dispatch(isFormSubmitted(response.data.success))
                        dispatch(addProduct(response.data))
                    }).catch(e => {
                    console.log(e);
                })
                break;
            case IS_FORM_SUBMITTED:
                dispatch(isFormSubmitted(data))
                break;
            case SALES_INVOICES:
                axios.get(url)
                    .then((response) => {
                        dispatch(salesInvoices(response.data))
                        return response;
                    })
                break;
            case SALE_INVOICE_TO_SHOW:
                dispatch(saleInvoiceToShow(data))
                break;
            case IS_OPEN_MODAL:
                dispatch(isOpenModal(data))
                break;
            case SELECTED_PRODUCTS:
                dispatch(selectedProducts(data))
                break;
            case SALE_PRODUCTS:
                axios.post(url, {data})
                    .then((response) => {
                        dispatch(saleProducts(response.data))
                        return response;
                    }).then(() => {
                    dispatch(isOpenModal(0));
                })
                break;
            case SOLD_PRODUCTS:
                axios.get(url)
                    .then((response) => {
                        dispatch(soldProducts(response.data))
                        return response;
                    })
                break;
            default:
                break;
        }

    }
}