import { CATEGORIES, ADD_CATEGORY } from "../../pages/partials/consts/actionsConstants";

const initialState = {
  categories: []
}

export const categoryReducer = (state = initialState, action) => {
    let categories = [];
    switch (action.type) {
      case CATEGORIES :
        return {
          ...state,
          categories: action.categories
        }
        case ADD_CATEGORY :
            categories = state.categories.data;
            let newCategory = action.payload.data;

            if (categories.length == 0) {
                categories.push(newCategory);
            } else {
                categories.unshift(newCategory);
            }

            return {
                ...state,
                categories: {data: categories},
                newCategory: action.payload
            }
      default:
         return state
    }
  }