import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IStoreObj } from "./store-reducers";

export const selectUserState = createFeatureSelector<IStoreObj>('storedata');


export const selectIsLoggedIn = createSelector(
  selectUserState,
  (state) => !!state.user
);

export const selectUser = createSelector(
  selectUserState,
  (state) => state?.user
);
