import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPostsState } from './posts.state';

const getPostState = createFeatureSelector<IPostsState>('posts'); // the name in the reducer

export const getPosts = createSelector(getPostState, (state) => {
  return state.posts;
}); // the name in the component

export const getPostById = createSelector(getPostState, (state:any,props:any) => {
  return state.posts.find((post:any) =>post.id === props.id);
});
