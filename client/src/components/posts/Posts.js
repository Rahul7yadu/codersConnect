import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { getPosts } from '../../actions/posts'
import Spinner from '../../components/layout/Spinner'
import PostForm from './PostForm'
import PostsItem from './PostsItem'
const Posts = () => {
  const loading = useSelector((state) =>state.post.loading)
  const posts = useSelector(state=>state.post.posts)
  
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getPosts())
  },[dispatch])
  return (
    <div className='container'>{loading?<Spinner/>:<>
    <h1 className="large text-primary">posts</h1>
    <p className="lead">
      <i className="fas fa-user"><span>Welcome to community</span></i>
    </p>
    <PostForm/> 
    <div className="posts">
      {posts.length&&posts.map(post=>(
        <PostsItem key = {post._id} post = {post}/>
      ))}
    </div>
    </>}</div>
  )
}

export default Posts