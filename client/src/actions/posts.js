import axios from "axios";
import { alertAction, postAction } from "../store";
import {db} from '../firebase'
import {ref,set} from 'firebase/database'
export const getPosts = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("api/posts");
      dispatch(postAction.getPosts(res.data));
    } catch (error) {
      dispatch(postAction.postsError(error.message));
    }
  };
};
export const addLike = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`api/posts/like/${id}`);
      dispatch(postAction.updateLikes({ id, likes: res.data }));
    } catch (error) {
      dispatch(postAction.postsError(error.message));
    }
  };
};
export const removeLike = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `api/posts/unlike/${id}`
      );
      dispatch(postAction.updateLikes({ id, likes: res.data }));
    } catch (error) {
      dispatch(postAction.postsError(error.message));
    }
  };
};

export const deletePost = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`api/posts/${id}`);
      dispatch(postAction.deletePosts(id));
      dispatch(
        alertAction.setAlert({ message: "post removed", alertType: "success" })
      );
    } catch (error) {
      dispatch(postAction.postsError(error.message));
      dispatch(
        alertAction.setAlert({
          message: "could not remove post",
          alertType: "danger",
        })
      );
    }
  };
};
export const addPost = (formData,userId) => {
  const config = {
    headers: { "Content-type": "application/json" },
  };
  return async (dispatch) => {
      await set(ref(db,'users/'+userId+'/posts'),formData)
    try {
      const res = await axios.post(
        `api/posts`,
        formData,
        config
      );
      dispatch(postAction.addPost(res.data));
      dispatch(
        alertAction.setAlert({ message: "post added", alertType: "success" })
      );
    } catch (error) {
      dispatch(postAction.postsError(error.message));
      dispatch(
        alertAction.setAlert({
          message: "could not add post",
          alertType: "danger",
        })
      );
    }
  };
};
export const getPost = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/posts/${id}`);
      dispatch(postAction.getPost(res.data));
    } catch (error) {
      dispatch(postAction.postsError(error.message));
    }
  };
};
export const addComment = ( post_id, formData ) => {
  const config = {
    headers: { "Content-type": "application/json" },
  };
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `/api/posts/comment/${post_id}`,formData,config
      );
      dispatch(postAction.addComment(res.data));
      dispatch(alertAction.setAlert({message:'comment added',alertType:'success'}))
    } catch (error) {
      dispatch(postAction.postsError(error.message));
    }
  };
}

export const deleteComment = ({ post_id, comment_id}) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `api/posts/uncomment/${post_id}/${comment_id}`,
      );
      dispatch(postAction.deleteComment({comment_id}));
      dispatch(alertAction.setAlert({message:'comment deleted',alertType:'success'}))
    } catch (error) {
      dispatch(postAction.postsError(error.message));
    }
  };
}