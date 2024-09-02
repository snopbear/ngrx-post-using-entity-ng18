import { createReducer, on } from '@ngrx/store';
import { initialState } from './posts.state';
import { addPost, deletePost, loadPostsSuccess, updatePost, updatePostSuccess } from './posts.actions';

const _postsReducer = createReducer(
  initialState,
  on(addPost, (state, action) => {
    let post = { ...action.post };
    post.id = (state.posts.length + 1).toString();
    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),
  on(updatePostSuccess, (state, action) => {
    // const updatedPosts = state.posts.map((post) =>
    //   post.id === action.post.id ? action.post : post
    // );

    const updatedPosts = state.posts.map((post) => {
      if (post.id === action.post.id) {
        return action.post;
      }
      return post;
    });
    return {
      ...state,
      posts: updatedPosts,
    };
  }),
  on(deletePost, (state, action) => {
    const deletedPosts = state.posts.filter((post) => post.id !== action.id);
    return {
      ...state,
      posts: deletedPosts,
    };
  }),
  on(loadPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts,
    };
  })
);

export function PostsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}
