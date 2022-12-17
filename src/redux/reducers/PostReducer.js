import { PostActionTypes } from '../constants/PostActionTypes';

const initState = {
    allPosts: [],
}; 

export const postsReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case PostActionTypes.ADD_POST:
            return {...state, allPosts: [...state.allPosts, payload]};
            //remove
            //update
            //...
        default:
            return state;
    }
};
