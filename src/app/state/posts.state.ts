import { IPost } from "../models/posts.interface"

export interface IPostsState{
    posts:IPost[];
}

export const initialState: IPostsState = {
  // posts: [
  //   { id: '1', title: 'First', description: 'First' },
  //   { id: '2', title: 'Second', description: 'Second' },
  // ],
  posts: [], // or can be null too
};