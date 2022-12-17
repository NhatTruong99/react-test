import { combineReducers } from 'redux';
import { postsReducer } from "./PostReducer";
//import { currentUserReducer } from "./UserReducer";
import { tokenReducer } from "./AuthReducer";
import { groupsReducer } from "./GroupReducer";

export const reducers = combineReducers({
    allPosts: postsReducer,
    token: tokenReducer,
    allGroups: groupsReducer
    //currentUser: currentUserReducer
});