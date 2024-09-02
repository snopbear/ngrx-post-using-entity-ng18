import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPostsState, postAdapter } from './posts.state';
import { RouterStateUrl } from '../router-config/router-reducer/custom-route-serializer';
import { getCurrentRoute } from '../router-config/router-select/router-select';

export const POST_STATE_NAME='post';
const getPostState = createFeatureSelector<IPostsState>(POST_STATE_NAME); // the name in the reducer

export const postsSelectors = postAdapter.getSelectors();


export const getPosts = createSelector(getPostState, postsSelectors.selectAll);


export const getPostEntities = createSelector(
  getPostState,
  postsSelectors.selectEntities
);

export const getPostById = createSelector(
  getPostEntities,
  getCurrentRoute,
  (posts, route: RouterStateUrl) => {
    return posts ? posts[route.params['id']] : null;
  }
);


export const getCount = createSelector(getPostState, (state) => state.count);