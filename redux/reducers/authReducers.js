import {IS_TOKEN_VALID, TOKEN_DOES_NOT_VALID, USER_ID_CONTAINER} from "../../pages/partials/consts/actionsConstants";

export const authReducers = (state = [], action) => {
    switch (action.type) {
        case IS_TOKEN_VALID :
            return {
                ...state,
                // token : action.token,
                isUserLoggedIn: action.payload
            }
        case TOKEN_DOES_NOT_VALID :
            return {
                ...state,
                // token : action.token,
                isUserLoggedIn: false
            }
        // case USER_ID_CONTAINER :
        //     return {
        //         ...state,
        //         userId : action.userId
        //     }
        default :
            return state;
    }
}