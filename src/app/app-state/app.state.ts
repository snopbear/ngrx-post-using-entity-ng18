import { AuthReducer } from "../auth/state/auth.reducer";
import { AUTH_STATE_NAME } from "../auth/state/auth.selector";
import { AuthState } from "../auth/state/auth.state";
import { SHARED_STATE_NAME } from "../shared/store/shared.selector";
import { SharedState } from "../shared/store/shared.state";
import { PostsReducer } from "../state/posts.reducers";
import { POST_STATE_NAME } from "../state/posts.selector";
import { IPostsState } from "../state/posts.state";

export interface AppState {
  [POST_STATE_NAME]: IPostsState;
  [AUTH_STATE_NAME]:AuthState;
  [SHARED_STATE_NAME]: SharedState;
}

export const appReducer={
posts:PostsReducer,
auth:AuthReducer
}