import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    level: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signIn: (state, action) => {
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
                level: null
            }
        },
        login: (state, action) => {
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.payload,
                level: null
            };
        },
        logout: () => null,
        update: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
});

// Action creators are generated for each case reducer function
const userReducer = userSlice.reducer;
const userActions = userSlice.actions;

export default userReducer;
export { userActions };
