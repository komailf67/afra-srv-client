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
import {authReducers} from "./authReducers";
import {errorsReducer} from "./errorsReducer";
import {usersReducer} from "./usersReducer";

const rootReduces = combineReducers({
    auth: authReducers,
    categories: categoryReducer,
    products: productsReducer,
    formReducer: formReducer,
    sales: salesReducer,
    isOpenModal: modalReducer,
    messageShowed: messageReducer,
    orders: ordersReducer,
    productsList: productsListReducer,
    preInvoices: preInvoicesReducer,
    error: errorsReducer,
    users: usersReducer,
});

export default rootReduces;
