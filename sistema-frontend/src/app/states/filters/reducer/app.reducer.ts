import { createReducer, on } from '@ngrx/store';
import { setFilterSpaceName, setFilterTaskName } from '../action/app.action';

export const initialState = {
  space_name: '',
  task_name: ''
};

export const filtersReducer = createReducer(
  initialState,
  on(setFilterSpaceName, (state, { space_name }) => (
    {
      ...state,
      space_name
    }
  )
  ),
  on(setFilterTaskName, (state, { task_name }) => (
    {
      ...state,
      task_name
    }
  )
  ),
);