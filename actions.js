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

export const postData = (todo) => dispatch => {
    dispatch({type: FETCH_POSTS})
    axios.all([
        axios.post('http://localhost:3000/todos', todo),
        axios.get('http://localhost:3000/todos')
      ])
      .then(axios.spread((post, get) => {
        console.log(post)
        dispatch({type: FETCH_POSTS_COMPLETE, payload: get.data})
      }))
      .catch(err => {
        dispatch({type: FETCH_POSTS_FAIL})
      })
}

export const toggleComplete = (todo, id) => dispatch => {
    axios.all([
        axios.put(`http://localhost:3000/todos/${id}`, todo),
        axios.get('http://localhost:3000/todos')
      ])
      .then(axios.spread((post, get) => {
        console.log(post)
        dispatch({type: FETCH_POSTS_COMPLETE, payload: get.data})
      }))
      .catch(err => {
        dispatch({type: FETCH_POSTS_FAIL})
      })
} 

export const removeTask = (id) => dispatch => {
    axios.all([
        axios.delete(`http://localhost:3000/todos/${id}`),
        axios.get('http://localhost:3000/todos')
    ])
    .then(axios.spread((removed, get) => {
        console.log(removed)
        dispatch({type: FETCH_POSTS_COMPLETE, payload: get.data})
      }))
      .catch(err => {
        dispatch({type: FETCH_POSTS_FAIL})
      })
}