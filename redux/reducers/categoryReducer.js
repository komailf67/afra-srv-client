import { ORDERS, PRODUCTS, CATEGORIES, ADD_PRODUCTS } from "../../pages/partials/consts/actionsConstants";

const initialState = {
  categories: []
}

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case CATEGORIES :
        return {
          ...state,
          categories: action.categories
        }
      default:
         return state
    }
  }