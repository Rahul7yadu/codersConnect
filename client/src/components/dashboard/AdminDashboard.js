import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadUsers, loadPosts, removeUser ,removePost} from '../../actions/admin'
import Moment from 'react-moment'
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostsItem'
export const AdminDashboard = () => {
  const users = useSelector(state => state.admin.Users)
  const posts = useSelector(state => state.admin.posts)
  const dispatch = useDispatch()
  const getUsers = () => {
    dispatch(loadUsers())
  }
  const getPosts = () => {
    dispatch(loadPosts())
  }
  const deleteUser = (id) => {
    dispatch(removeUser(id))
  }
  const deletePost = (id) =>{
    dispatch(removePost(id))
  }
  useEffect(() => {
    getUsers()
  }, [])
  return (
    <div style={{ marginTop: 200 }} className='dashboard'>
      <h1 className='large text-primary'>AdminDashboard</h1>
      <h3 className='medium text-primary'>Users</h3>
      
      {users ? (
        users.map((user, idx) => (
          <div className='users bg-white p-1 my-1' key={idx}>
            <div>
              <div >
                <img className="round-img" src={user.avatar} alt="" />
                <h4>{user.name}</h4>
              </div>

            </div>

            <div>{user.email}</div>
            <div style={{ height: '5px ', borderBottom: '2px solid red' }}></div>
            <div>
              <h4 className='text-secondary'>joined on</h4>
              <Moment format="DD/MM/YYYY">{user.date}</Moment>
            </div>
            <button onClick={() => deleteUser(user._id)} className='btn btn-danger'>delete user</button>
          </div>))

      ) : <Spinner />}
      <button onClick={getPosts} className='btn btn-light'>
        get posts
      </button>
      {posts != null && posts.length >= 1 ?
      

       posts.map((post, id) => (
      
      
       <PostItem post={post} key={id} showAction={false}>

          {/* <div className='post bg-white p-1 my-1'>
            <div >
            <img className="round-img" src={post.avatar} alt="" />
            </div>
            <h3>{post.text}</h3>
            <h4>{post.name}</h4>
          </div>     */}
        <button className='btn btn-danger' onClick={()=>deletePost(post._id)}>delete post</button>
        </PostItem>
       
              ))
              
              : <h6 className='text-primary'>no post yet</h6>
      }
     
    </div>
  )
}
