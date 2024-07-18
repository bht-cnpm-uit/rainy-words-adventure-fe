import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
<<<<<<< HEAD
    level: null
=======
    avatar: '/assets/Asset/Avt_Frame_cuts/3.png',
    frame: null,
>>>>>>> cc4c6f80d2bb04ed31bd8b70bb3b2f7c85e81426
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signIn: (state, action) => {
            return {
                ...state,
<<<<<<< HEAD
                isLoggedIn: false,
                userInfo: null,
                level: null
            }
=======
                isLoggedIn: true,
                userInfo: action.payload,
            };
>>>>>>> cc4c6f80d2bb04ed31bd8b70bb3b2f7c85e81426
        },
        login: (state, action) => {
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.payload,
                level: null
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
