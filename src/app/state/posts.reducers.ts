import { createReducer, on } from '@ngrx/store';
import { initialState, postAdapter } from './posts.state';
import {
  addPost,
  deletePost,
  deletePostSuccess,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess,
} from './posts.actions';

const _postsReducer = createReducer(
  initialState,
  on(addPost, (state, action) => {
    return postAdapter.addOne(action.post, state);
  }),
  on(updatePostSuccess, (state, action) => {
    return postAdapter.updateOne(action.post, state);
  }),
  on(deletePostSuccess, (state, { id }) => {
    return postAdapter.removeOne(id, state);
  }),
  on(loadPostsSuccess, (state, action) => {
    return postAdapter.setAll(action.posts, state);
  })
);

export function PostsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}
