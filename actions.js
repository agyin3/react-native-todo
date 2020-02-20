import axios from 'axios'

export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POSTS_COMPLETE = 'FETCH_POSTS_COMPLETE'
export const FETCH_POSTS_FAIL = 'FETCH_POSTS_FAIL'

export const fetchData = () => dispatch => {
    dispatch({type: FETCH_POSTS})

    axios.get('http://localhost:3000/todos')
    .then(res => {
        dispatch({type: FETCH_POSTS_COMPLETE, payload: res.data})
    })
    .catch(err => {
        dispatch({type: FETCH_POSTS_FAIL})
    })
}