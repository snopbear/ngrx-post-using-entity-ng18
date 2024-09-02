import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { IPost } from '../models/posts.interface';

export interface IPostsState extends EntityState<IPost> {
  count: number;
}

export const postAdapter = createEntityAdapter<IPost>({
  sortComparer: sortByName,
});


export const initialState: IPostsState = postAdapter.getInitialState({
  count: 0
});


export function sortByName(a: IPost, b: IPost): number {
  const compare = a.title.localeCompare(b.title);
  if (compare > 0) {
    return -1;
  }

  if (compare < 0) {
    return 1;
  }

  return compare;
}