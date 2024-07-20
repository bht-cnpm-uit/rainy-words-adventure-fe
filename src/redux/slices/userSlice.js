import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    level: null,
    avatar: '/assets/Asset/Avt_Frame_cuts/3.png',
    frame: null,
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
                avatar: '/assets/Asset/Avt_Frame_cuts/3.png',
                frame: null,
            };
        },
        logout: () => initialState,
        setAvatar(state, action) {
            state.avatar = action.payload;
        },
        setFrame(state, action) {
            state.frame = action.payload;
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
    },
});

const userReducer = userSlice.reducer;
const userActions = userSlice.actions;

export const { setAvatar, setFrame } = userSlice.actions;
export default userReducer;
export { userActions };
