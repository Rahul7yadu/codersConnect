import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {addComment} from '../../actions/posts'
const CommentForm = ({post_id}) => {
const [text,setText] = useState('')
const dispatch = useDispatch()
  return (
    <div>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>leave a comment</h3>
        </div>
        <form className="form my-1" onSubmit={(e)=>{
            e.preventDefault()
            dispatch(addComment(post_id,{text}))
            setText('')
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
            value={text}
            onChange={(e)=>{setText(e.target.value)}}
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    </div>
  )
}

export default CommentForm