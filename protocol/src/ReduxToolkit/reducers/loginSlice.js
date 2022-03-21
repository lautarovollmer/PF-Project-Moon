import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        loginSuccess: (state, action) => {
            state.isFetching = false
            state.currentUser = action.payload
            state.error = false
        },
        loginFailure: (state) => {
            state.isFetching = true
            state.error = true
        },
        logoutStart: (state) => {
            state.currentUser = null
            state.isFetching = false
            state.error = false
        }
    }
})

export const { loginStart, loginSuccess, loginFailure, logoutStart } = loginSlice.actions;
export default loginSlice.reducer;