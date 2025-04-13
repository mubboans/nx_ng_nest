import { createReducer, on } from "@ngrx/store";
import { clearUser, setUser, updateToken } from "./store-actions";

export interface IStoreObj {
  user: {
    name: string;
    email: string;
    token?: string | null;
  } | null;
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
  on(updateToken, (state, { token }) => {
    if (!state.user) return state;
    const updatedUser = { ...state.user, token };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return { ...state, user: updatedUser };
  })
);
