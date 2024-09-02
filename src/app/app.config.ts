import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { NavigationActionTiming, provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { POST_STATE_NAME } from './state/posts.selector';
import { AuthReducer } from './auth/state/auth.reducer';
import { AuthEffects } from './auth/state/auth.effects';
import { AUTH_STATE_NAME } from './auth/state/auth.selector';
import {  provideHttpClient, withInterceptors } from '@angular/common/http';
import { SHARED_STATE_NAME } from './shared/store/shared.selector';
import { SharedReducer } from './shared/store/shared.reducer';
import { PostsEffects } from './state/posts.effects';
import { PostsReducer } from './state/posts.reducers';
import { AuthTokenInterceptor } from './service/authToken-interceptor/AuthToken.interceptor';
import { CustomSerializer } from './router-config/router-reducer/custom-route-serializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),

    provideRouterStore(),

    provideStore({
      router: routerReducer,
    }),
    provideRouterStore({
      serializer: CustomSerializer,
      navigationActionTiming: NavigationActionTiming.PostActivation,
      
    }),

    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),

    provideEffects([AuthEffects]),
    provideEffects([PostsEffects]),

    provideState({ name: POST_STATE_NAME, reducer: PostsReducer }),
    provideState({ name: AUTH_STATE_NAME, reducer: AuthReducer }),
    provideState({ name: SHARED_STATE_NAME, reducer: SharedReducer }),

    provideHttpClient(withInterceptors([AuthTokenInterceptor])),
  ],
};
