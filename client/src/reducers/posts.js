import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    posts:[],
    post:null,
    loading:true, 
    error:{},
    

}
const  postSlice = createSlice({
    name:'post',
    initialState,
    reducers:{
            getPosts(state,action){
                    state.posts = action.payload
                    state.loading = false
            },postsError(state,action){
                state.error = action.payload
                state.loading = false
            },updateLikes(state,action){
                state.posts.forEach(post => (post._id === action.payload.id) && (post.likes=action.payload.likes))
                state.loading = false
            },deletePosts(state,action){
                state.posts = state.posts.filter(post=>post._id!==action.payload)
                state.loading = false;
            },
            addPost(state,action){
                state.posts = action.payload
                state.loading = false; 
            },getPost(state, action){
                state.post = action.payload
                state.loading = false;
            },addComment(state,action){
                state.post.comments = action.payload
            },deleteComment(state,action){
                state.post.comments = state.post.comments.fiter(comment=>comment._id!==action.payload.comment_id)
            }
    }
})
export default postSlice