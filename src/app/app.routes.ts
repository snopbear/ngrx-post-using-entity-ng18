import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },

  {
    path: 'list',
    loadComponent: () =>
      import('./components/posts-list/posts-list.component').then(
        (x) => x.PostsListComponent
      ),
  },
];
