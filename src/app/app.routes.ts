import { Routes } from '@angular/router';
import { AddPostComponent } from './components/add-post/add-post.component';
import { AuthGuard } from './service/auth-guard/auth.guard';

const auth: Routes = [
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./auth/login/login.component').then((x) => x.LoginComponent),
  },
  {
    path: 'auth/signup',
    loadComponent: () =>
      import('./auth/signup/signup.component').then((x) => x.SignupComponent),
  },
];


const posts: Routes = [
  {
    path: 'post/list',
    loadComponent: () =>
      import('./components/posts-list/posts-list.component').then(
        (x) => x.PostsListComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'post/edit/:id',
    loadComponent: () =>
      import('./components/edit-post/edit-post.component').then(
        (x) => x.EditPostComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'post/single/:id',
    loadComponent: () =>
      import('./components/single-post/single-post.component').then(
        (x) => x.SinglePostComponent
      ),
    canActivate: [AuthGuard],
  },
];

export const routes: Routes = [
  { path: '', redirectTo: 'post/list', pathMatch: 'full' },
  ...auth,
  ...posts,
];
