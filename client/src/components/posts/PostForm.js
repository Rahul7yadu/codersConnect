import { useSelector, useDispatch} from "react-redux";
import {useState} from 'react'
import { addPost } from "../../actions/posts";
const PostForm = () => {
  const [text,setText] = useState('')
  const dispatch = useDispatch()
  return (

    <div>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1" onSubmit={(e)=>{
            e.preventDefault()
            dispatch(addPost({text}))
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
          <input type="submit" className="btn btn-light my-1" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default PostForm;
