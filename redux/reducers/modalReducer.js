import {IS_OPEN_MODAL} from "../../pages/partials/consts/actionsConstants";

const initialState = {
    is_open_modal: false
}

export const modalReducer = (state = initialState, action) => {   
    switch (action.type) {

        case IS_OPEN_MODAL:
            return {
                ...state,
                is_open_modal: action.trueOrFalse
            }
        default:
            return state
    }
}