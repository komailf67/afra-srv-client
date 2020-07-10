import {
    CHECK_PRE_INVOICES_ACCESS,
    PRE_INVOICES,
    SHOW_ONE_PRE_INVOICE_DETAILS
} from "../../pages/partials/consts/actionsConstants";

const initialState = {
    preInvoices: []
}

export const preInvoicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRE_INVOICES:
            return {
                ...state,
                preInvoices: action.payload
            }
        case SHOW_ONE_PRE_INVOICE_DETAILS:
            return {
                ...state,
                preInvoiceDetails: action.payload
            }
        case CHECK_PRE_INVOICES_ACCESS:
            return {
                ...state,
                preInvoicesAccess: action.payload
            }
        default:
            return state
    }
}