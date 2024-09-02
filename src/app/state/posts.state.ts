import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { IPost } from '../models/posts.interface';

export interface IPostsState extends EntityState<IPost> {
}

export const postAdapter = createEntityAdapter<IPost>();


export const initialState: IPostsState = postAdapter.getInitialState();
