import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className="title-and-author">
      {blog.title} {blog.author}
    </div>
    <div className="likes">
      blog has {blog.likes} likes
      <button className="like-button" onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog