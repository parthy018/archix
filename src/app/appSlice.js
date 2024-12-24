import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    isAuth: false,
    role: null,
    token: null,
};

const appSlice=createSlice({
    name:"app",
    initialState,
    reducers:{
        login: (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
        },
        adminLogin: (state, action) => {
            state.token = action.payload.token;
            state.isAuth = true;
            state.role = action.payload.role;
        },
        logout: (state) => {
            state.user = null;
            state.isAuth = false;
            state.role = null;
            state.token = null;
        },
    }
});

export const { login, logout,adminLogin } = appSlice.actions;
export default appSlice.reducer;