import { exhaustMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppState } from '../../app-state/app.state';
import { getToken } from '../../auth/state/auth.selector';

export const AuthTokenInterceptor = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const store = inject(Store<AppState>);
      return store.select(getToken).pipe(
        take(1),
        exhaustMap((token) => {
          if (!token) {
            return next(req);
          }
          let modifiedReq = req.clone({
            params: req.params.append('auth', token),
          });
          return next(modifiedReq);
        })
      );
};