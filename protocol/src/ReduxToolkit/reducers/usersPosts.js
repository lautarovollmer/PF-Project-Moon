import { createSlice } from '@reduxjs/toolkit'

const userPostsSlice = createSlice({
    name: "userPostsById",
    initialState: {
        posts: [],
        isFetching: false,
        error: false
    },
    reducers: {
        userPostsStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        userPostsSuccess: (state, action) => {
            state.posts = action.payload
            state.isFetching = false
            state.error = false
        },
        userPostsFailure: (state) => {
            state.isFetching = true
            state.error = true
        },
        updatePosts: (state, action) => {
            state.posts = [action.payload, ...state.posts]
        },
    }
})

export const {
    userPostsStart,
    userPostsSuccess,
    userPostsFailure,
    updatePosts,
} = userPostsSlice.actions;

export default userPostsSlice.reducer;