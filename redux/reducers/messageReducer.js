import { MESSAGE_SHOWED } from "../../pages/partials/consts/actionsConstants";

const initialState = {
    messageShowed: true
}

export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case MESSAGE_SHOWED:
            return {
                ...state,
                messageShowed: action.payload
            }
        default:
            return state

    }
}