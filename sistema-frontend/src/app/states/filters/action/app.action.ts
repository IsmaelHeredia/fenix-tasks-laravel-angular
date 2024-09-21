import { createAction, props } from '@ngrx/store';

export const setFilterSpaceName = createAction('[setFilterSpaceName] Update filters space name', props<{ space_name: string }>());
export const setFilterTaskName = createAction('[setFilterTaskName] Update filters task name', props<{ task_name: string }>()); 