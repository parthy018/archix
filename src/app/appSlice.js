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
            state.token=action.payload.token;
            state.role=action.payload.role;
            state.isAuth = true;
        },
        signup:(state,action)=>{
            state.isAuth=true;
            state.role=action.payload.role;
            state.token=action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.isAuth = false;
            state.role = null;
            state.token = null;
        },
    }
});

export const { login, logout,signup } = appSlice.actions;
export default appSlice.reducer;