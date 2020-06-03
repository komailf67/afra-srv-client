import {combineReducers} from "redux";
import {productsReducer} from "./productsReducer";
import {categoryReducer} from "./categoryReducer";
import {formReducer} from "./formReducer";
import {salesReducer} from "./salesReducer";
import {modalReducer} from "./modalReducer";
import {messageReducer} from "./messageReducer";
import {ordersReducer} from "./orderReducers";
import {productsListReducer} from "./productsListReducer";
import {preInvoicesReducer} from "./preInvoicesReducer";

const rootReduces = combineReducers({
    categories: categoryReducer,
    products: productsReducer,
    formReducer: formReducer,
    sales: salesReducer,
    isOpenModal: modalReducer,
    messageShowed: messageReducer,
    orders: ordersReducer,
    productsList: productsListReducer,
    preInvoices: preInvoicesReducer,
});

export default rootReduces;
