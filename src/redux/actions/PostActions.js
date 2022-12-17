import { PostActionTypes } from '../constants/PostActionTypes';

export const addPost = (post) => {
    return {
        type: PostActionTypes.ADD_POST,
        payload: post
    };
};

export const updatePost = (post) => {
    return {
        type: PostActionTypes.UPDATE_SELECTED_POST,
        payload: post
    };
};

export const removePost = (id) => {
    return {
        type: PostActionTypes.REMOVE_SELECTED_POST,
        payload: id
    };
};