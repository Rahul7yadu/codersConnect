import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getPost } from "../../actions/posts";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostsItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
const Post = () => {
  const loading = useSelector((state) => state.post.loading);
  const post = useSelector((state) => state.post.post);
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);
  
  return (
    <>
      {post === null || loading ? (
        <Spinner />
      ) : (
        <section className="container">
          <Link to="/posts" className="bg bg-light"><button>back to posts</button></Link>
          {<PostItem showAction={false} post={post} />}
          <CommentForm post_id={id} />
          {post.comments.length > 0 ? (
            post.comments.map((comment) => {
              return (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  user_id={post.user}
                />
              );
            })
          ) : (
            <div>no comments</div>
          )}
        </section>
      )}
    </>
  );
};

export default Post;
