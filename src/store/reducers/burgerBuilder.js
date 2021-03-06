import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients: null,
    burgerCost: 4,
    error: false,
    building: false,
}

const ingredientsCost = {
    meat: 1.3,
    cheese: 0.6,
    bacon: 1,
    salad: 0.5
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
                },
                burgerCost: state.burgerCost + ingredientsCost[action.ingredientName],
                building: true,
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
                },
                burgerCost: state.burgerCost - ingredientsCost[action.ingredientName],
                building: true,
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    meat: action.ingredients.meat,   
                    cheese: action.ingredients.cheese,
                    bacon: action.ingredients.bacon,
                    salad: action.ingredients.salad,
                },
                burgerCost: 4,
                error: false,
                building: false,
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default: 
            return state
    }
    
}

export default reducer