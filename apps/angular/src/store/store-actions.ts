import { createAction, props } from "@ngrx/store";
import { IUser } from "../interfaces/user";

export const setUser = createAction( 'SET_USER_DATA', props<IUser>()
);

export const clearUser = createAction('CLEAR_USER_DATA');

export const updateUser = createAction( 'UPDATE_USER', props<IUser>() );

