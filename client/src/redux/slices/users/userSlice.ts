import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../../store'
import {Status, UsersState, UserType} from "./types";
import {blockAllUsers, checkAllUsers, checkUser, deleteCheckedUsers, deleteOneUser, fetchUsers} from "./asyncActions";



const initialState: UsersState = {
    users: [],
    status: Status.LOADING,
    error: null

}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<UserType[]>) {
            state.users = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.status = Status.LOADING;
            state.users = [];
            state.error = null;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.users = action.payload;
            state.error = null;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.users = [];
            state.error = (action.payload as { errorMessage: string }).errorMessage;
        });
        builder.addCase(blockAllUsers.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.error = (action.payload as { errorMessage: string }).errorMessage;
        });
        builder.addCase(checkUser.rejected, (state, action) => {
            state.error = (action.payload as { errorMessage: string }).errorMessage;
        });
        builder.addCase(checkAllUsers.rejected, (state, action) => {
            state.error = (action.payload as { errorMessage: string }).errorMessage;
        });
        builder.addCase(deleteOneUser.rejected, (state, action) => {
            state.error = (action.payload as { errorMessage: string }).errorMessage;
        });
        builder.addCase(deleteCheckedUsers.rejected, (state, action) => {
            state.error = (action.payload as { errorMessage: string }).errorMessage;
        });
    }
})


export const usersSelector = (state: RootState) => state.users
export const {setUsers} = userSlice.actions
export default userSlice.reducer