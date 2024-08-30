import { postsReducer } from "../state/posts.reducers";
import { IPostsState } from "../state/posts.state";

export interface AppState{
    posts:IPostsState
}

export const appReducer={
posts:postsReducer
}