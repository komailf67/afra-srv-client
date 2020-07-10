import {UPDATE_ACCESS, USERS} from "../../pages/partials/consts/actionsConstants";

const initialState = {
    users: [],
}

export const usersReducer = (state = initialState, action) => {
    let usersAccess;
    switch (action.type) {

        case USERS:
            return {
                ...state,
                users: action.payload
            }
        case UPDATE_ACCESS:
            usersAccess = state.users.data;
            usersAccess.map((user, index)=>{
                if (user.id === action.payload.data.id) {
                    usersAccess[index]['user_access'] = action.payload.data
                }
            })
            return {
                ...state,
                users: {data: usersAccess}
            }
        default:
            return state
    }
}