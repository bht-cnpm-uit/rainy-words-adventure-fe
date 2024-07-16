import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: "night",
};

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        changeMode: (state, action) => {
            return {
                ...state,
                mode: action.payload,
            };
        },
        update: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
});

// Action creators are generated for each case reducer function
const configReducer = configSlice.reducer;
const configActions = configSlice.actions;

export default configReducer;
export { configActions };
