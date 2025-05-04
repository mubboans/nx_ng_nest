import { createReducer, on } from "@ngrx/store";
import { clearUser, setUser, updateUser } from "./store-actions";
import { IUser } from "../interfaces/user";

export interface IStoreObj {
  user: IUser | null;
  // Add other properties as needed
}

const localUser = localStorage.getItem('user');
const initialState: IStoreObj = {
  user: localUser ? JSON.parse(localUser) : null,
};


export const storeReducer = createReducer(
  initialState,
  on(setUser, (state, user) => {
    localStorage.setItem('user', JSON.stringify(user));
    console.log(state, user,' Check state and user');
    return { ...state, user };
  }),
  on(clearUser, (state) => {
    localStorage.removeItem('user');
    return { ...state, user: null };
  }),
  on(updateUser, (state, user) => {
    if (!state.user) return state;
    const updatedUser = { ...state.user, user };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return { ...state, user: updatedUser };
  })
);
