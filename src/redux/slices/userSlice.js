import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
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
                isLoggedIn: true,
                userInfo: action.payload,
            };
        },
        login: (state, action) => {
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.payload,
            };
        },
        logout: () => initialState,
        update: (state, action) => {
            return { ...state, ...action.payload };
        },
        setAvatar(state, action) {
            state.avatar = action.payload;
        },
        setFrame(state, action) {
            state.frame = action.payload;
        },
    },
});

const userReducer = userSlice.reducer;
const userActions = userSlice.actions;

export const { setAvatar, setFrame } = userSlice.actions;
export default userReducer;
export { userActions };
