import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPostsState } from './posts.state';
import { RouterStateUrl } from '../router-config/router-reducer/custom-route-serializer';
import { getCurrentRoute } from '../router-config/router-select/router-select';

export const POST_STATE_NAME='post';
const getPostState = createFeatureSelector<IPostsState>(POST_STATE_NAME); // the name in the reducer

export const getPosts = createSelector(getPostState, (state) => {
  return state.posts;
}); // the name in the component

export const getPostById = createSelector(
  getPosts,
  getCurrentRoute,
  (posts, route: RouterStateUrl) => {
    debugger
    return posts ? posts.find((post) => post.id === route.params['id']) : null;
  }
);