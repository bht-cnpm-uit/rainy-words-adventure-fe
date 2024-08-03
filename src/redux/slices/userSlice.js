import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    level: null,
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
                level: null,
            };
        },
        logout: () => initialState,
        setAvatar(state, action) {
            state.userInfo.AvatarId = action.payload.AvatarId;
            state.userInfo.FrameId = action.payload.FrameId;
        },
        setLevel(state, action) {
            return {
                ...state,
                level: action.payload
            }
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

export const { setAvatar, setUser, clearUser } = userSlice.actions;
export default userReducer;
export { userActions };
