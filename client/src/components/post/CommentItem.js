import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

const CommentItem = ({comment,user_id}) => {
    const {text,name, avatar,date} = comment
    console.log(comment)
  return (
      <div className="comments">
        <div>comment Item</div>
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user_id}`}>
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
            {text}
            </p>
             <p className="post-date">
               <Moment format="YYYY/MM/DD">{date}</Moment> 
            </p>
          </div>
        </div>
        </div>
  )
}

export default CommentItem