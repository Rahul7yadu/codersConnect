import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/posts";
const PostItem = ({post,showAction=true,children}) => {
  const { _id, text, name, avatar, user, likes, comments, date } = post
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div>
      
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img className="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            Posted on <Moment format="YYYY/MM/DD/  HH:MM:SS   dddd">{date}</Moment>
          </p>
          {showAction && <>
          
          <button
            type="button"
            className="btn btn-light"
            onClick={()=>dispatch(addLike(_id))}
          >
            <i className="fas fa-thumbs-up"></i>{" "}
            {likes.length > 0 && <span>{likes.length}</span>}
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={()=>dispatch(removeLike(_id))}
          >
            <i className="fas fa-thumbs-down"></i>
          </button>
          <Link to={`/post/${_id}`} className="btn btn-primary">
            Discussion{" "}
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={()=>dispatch(deletePost(_id))}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
          </>}
          {children}
        </div>
      </div>
    </div>
  );
};

export default PostItem;
