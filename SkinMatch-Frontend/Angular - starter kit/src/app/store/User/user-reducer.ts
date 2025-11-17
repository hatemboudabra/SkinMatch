import { Action, createReducer, on } from '@ngrx/store';
import {  fetchUserGridFailure,  fetchUserListData, fetchUserListFailure,  } from './user-action';

export interface UserState {
    UserList: any[];
    UserGrid: any[];
    loading: boolean;
    error: any;
}

export const initialState: UserState = {
    UserList: [],
    UserGrid: [],
    loading: false,
    error: null,
};

export const UserReducer = createReducer(
    initialState,
    on(fetchUserListData, (state) => {
        return { ...state, loading: true, error: null };
    }),
   
   



    on(fetchUserGridFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),
);

// Selector
export function reducer(state: UserState | undefined, action: Action) {
    return UserReducer(state, action);
}
