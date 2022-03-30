import axios from 'axios'
import {
    userPostsStart,
    userPostsSuccess,
    userPostsFailure,
} from '../reducers/usersPosts'

export const allPostById = async (dispatch, id) => {
    dispatch(userPostsStart())
    try {
        const res = await axios.get(`/api/profile/${id}`)
        dispatch(userPostsSuccess(res.data));
    } catch (error) {
        dispatch(userPostsFailure())
    }
}
