import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IPostsState } from "./posts.state";

const getPostState=createFeatureSelector<IPostsState>('posts'); // the name in the reducer 

export const getPosts=createSelector(getPostState, state=>state.posts); // the name in the component