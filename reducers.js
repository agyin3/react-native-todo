import {FETCH_POSTS, FETCH_POSTS_COMPLETE, FETCH_POSTS_FAIL} from './actions.js'

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                isLoading: true
            }
            break;
        case FETCH_POSTS_COMPLETE:
            return {
                ...state,
                todos:[...state.todos, ...action.payload],
                isLoading: false
            }
            break;
        case FETCH_POSTS_FAIL: 
            return {
                ...state,
                isLoading: false
            }
            break;
        default:
            return state
            break;
    }
}

export const initialState = {
    isLoading: false,
    todos:[]
}