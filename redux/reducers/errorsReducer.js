import {ERROR} from "../../pages/partials/consts/actionsConstants";

const initialState = {
    errors: [],
}

export const errorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}