import {createAsyncThunk} from "@reduxjs/toolkit";
import {UserType} from "./types";
import axios from "axios";

export const registerUser = createAsyncThunk<void, { email: string, username: string, password: string }>(
    "user/registerUserStatus",
    async ({email, username, password}, {rejectWithValue}) => {
        try {
            const response = await axios.post("http://localhost:5005/api/registration", {
                email,
                username,
                password,
            });
            return response.data;
        } catch (e: any) {
            return rejectWithValue({errorMessage: e.message});
        }
    }
);


export const loginUser = createAsyncThunk<void, { email: string, password: string }>(
    "user/loginUserStatus",
    async ({email, password}, {rejectWithValue}) => {
        try {
            const response = await axios.post("http://localhost:5005/api/login", {
                email,
                password,
            });
            return response.data;
        } catch (e: any) {
            return rejectWithValue({errorMessage: e.message});
        }
    }
);

export const fetchUsers = createAsyncThunk<UserType[]>(
    'user/fetchUsersStatus',
    async (params, {rejectWithValue}) => {
        try {
            const {data} = await axios.get(
                `http://localhost:5005/api/getUsers`
            );

            return data;
        } catch (e: any) {
            return rejectWithValue({errorMessage: e.message});
        }

    }
);
export const checkUser = createAsyncThunk<void, { userId: string, complete: boolean }>(
    'user/checkUserStatus',
    async ({userId, complete}, {rejectWithValue}) => {
        try {
            await axios.patch(
                `http://localhost:5005/api/check`,
                {_id: userId, complete}
            );
        } catch (e: any) {
            return rejectWithValue(e.message);
        }
    }
);

export const checkAllUsers = createAsyncThunk<void>(
    'user/checkAllUsersStatus',
    async (_, {rejectWithValue}) => {
        try {
            await axios.patch(
                `http://localhost:5005/api/checkAll`
            );
        } catch (e: any) {
            return rejectWithValue(e.message);
        }
    }
);

export const blockAllUsers = createAsyncThunk<void>(
    'user/blockAllUsersStatus',
    async (_, {rejectWithValue}) => {
        try {
            await axios.put(`http://localhost:5005/api/blockAll`);
        } catch (e: any) {
            return rejectWithValue(e.message);
        }
    }
);


export const blockUser = createAsyncThunk<void, string>(
    'user/blockUserStatus',
    async (userId, {rejectWithValue}) => {
        try {
            await axios.put(
                `http://localhost:5005/api/block/${userId}`
            );
        } catch (e: any) {
            return rejectWithValue(e.message);
        }
    }
);


export const deleteOneUser = createAsyncThunk<void, string>(
    'user/deleteOneUserStatus',
    async (userId, {rejectWithValue}) => {
        try {
            await axios.delete(
                `http://localhost:5005/api/deleteOne/${userId}`,
            );
        } catch (e: any) {
            return rejectWithValue(e.message);
        }
    }
);

export const deleteCheckedUsers = createAsyncThunk<void>(
    'user/deleteCheckedUsersStatus',
    async (_, {rejectWithValue}) => {
        try {
            await axios.delete(
                `http://localhost:5005/api/deleteChecked`
            );
        } catch (e: any) {
            return rejectWithValue(e.message);
        }
    }
);
