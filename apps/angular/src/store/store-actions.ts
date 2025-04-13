import { createAction, props } from "@ngrx/store";

export const setUser = createAction( 'SET_USER_DATA', props<{ name: string; email: string; token?: string | null }>()
);

export const clearUser = createAction('CLEAR_USER_DATA');

export const updateToken = createAction( 'SET_USER_TOKEN', props<{ token: string }>() );

