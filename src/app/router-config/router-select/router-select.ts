import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from '../router-reducer/custom-route-serializer';
export const getRouterState =
  createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const getCurrentRoute = createSelector(getRouterState, (router) => {
  return router.state;
});
