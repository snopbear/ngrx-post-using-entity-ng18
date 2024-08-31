import { Routes } from '@angular/router';
import { AddPostComponent } from './components/add-post/add-post.component';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },

  {
    path: 'list',
    loadComponent: () =>
      import('./components/posts-list/posts-list.component').then(
        (x) => x.PostsListComponent
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/edit-post/edit-post.component').then(
        (x) => x.EditPostComponent
      ),
  },
];
