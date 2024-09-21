import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const selectAppState = createFeatureSelector<AppState>('filters');

export const selectFilterSpace = createSelector(
  selectAppState,
  (state: AppState) => state.space_name
);

export const selectFilterTask = createSelector(
  selectAppState,
  (state: AppState) => state.task_name
);