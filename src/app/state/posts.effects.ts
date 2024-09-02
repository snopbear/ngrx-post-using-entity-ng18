import { getPosts } from './posts.selector';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import {
  filter,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import {
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  loadPosts,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess,
} from './posts.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  RouterNavigatedAction,
  routerNavigationAction,
  ROUTER_NAVIGATION,
} from '@ngrx/router-store';
import { of } from 'rxjs';
import { PostsService } from '../service/posts/posts.service';
import { AppState } from '../app-state/app.state';
import { IPost } from '../models/posts.interface';
// import { dummyAction } from 'src/app/auth/state/auth.actions';

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private store: Store<AppState>
  ) {}

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      mergeMap((action) => {
        return this.postsService.getPosts().pipe(
          map((posts) => {
            console.log(posts);
            return loadPostsSuccess({ posts });
          })
        );
        // return of(dummyAction());
      })
    );
  });

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map((data) => {
            const post = { ...action.post, id: data.name };
            return addPostSuccess({ post });
          })
        );
      })
    );
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePost),
      switchMap((action) => {
        return this.postsService.updatePost(action.post).pipe(
          map((data) => {
            return updatePostSuccess({ post: action.post });
          })
        );
      })
    );
  });
  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost),
      switchMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map((data) => {
            return deletePostSuccess({ id: action.id });
          })
        );
      })
    );
  });

  getSinglePost$ = createEffect(() => {
    debugger
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/post/single');
      }),
      map((r: any) => {
        return r.payload.routerState['params']['id'];
      }),
      switchMap((id) => {
        return this.postsService.getPostById(id).pipe(
          map((post) => {
            const postData = [{ ...post, id }];
            return loadPostsSuccess({ posts: postData });
          })
        );
      })
    );
  });
}
