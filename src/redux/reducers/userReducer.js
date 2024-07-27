// src/redux/reducers/userReducer.js
import { CLEAR_USER } from '../actions';

const initialState = {
    role: null,
    // other user state properties
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_USER:
            return initialState; // Reset to initial state
        // other cases
        default:
            return state;
    }
};

export default userReducer;
