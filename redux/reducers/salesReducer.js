import {SALES_INVOICES, SELECTED_PRODUCTS, SOLD_PRODUCTS, SALE_INVOICE_TO_SHOW} from "../../pages/partials/consts/actionsConstants";

const initialState = {
    sales: [],
    soldProducts: [],
    salesInvoices: [],
}

export const salesReducer = (state = initialState, action) => {
    switch (action.type) {

        case SALES_INVOICES:
            return {
                ...state,
                salesInvoices: action.salesInvoices
            }
        case SELECTED_PRODUCTS:
            return {
                ...state,
                selectedProductsIds: action.selectedProductsIds
            }
        case SOLD_PRODUCTS:
            return {
                ...state,
                soldProducts: action.payload
            }
        case SALE_INVOICE_TO_SHOW:
            return {
                ...state,
                saleInvoiceId: action.payload
            }
        default:
            return state
    }
}