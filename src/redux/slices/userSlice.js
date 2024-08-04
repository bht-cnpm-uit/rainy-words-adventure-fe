import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    level: null,
    role: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.userInfo = action.payload;
            state.level = null;
        },
        logout: () => initialState,
        setRole: (state, action) => {
            state.role = action.payload
        },
        setAvatar: (state, action) => {
            state.userInfo = {
                ...state.userInfo,
                AvatarId: action.payload.AvatarId,
                FrameId: action.payload.FrameId,
            };
        },
        updateInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        setLevel: (state, action) => {
            state.level = action.payload;
        },
        update: (state, action) => {
            return { ...state, ...action.payload };
        },
        setUser: (state, action) => {
            const { role, userInfo } = action.payload;
            state.role = role;
            state.userInfo = userInfo;
            state.isLoggedIn = true;
        },
        clearUser: (state) => {
            state.role = null;
            state.userInfo = null;
            state.isLoggedIn = false;
        },
    },
});

const userReducer = userSlice.reducer;
const userActions = userSlice.actions;

export default userReducer;
export { userActions };
