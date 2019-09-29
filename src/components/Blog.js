import React, {useState} from 'react'

const Blog = ({blog, user, handleLike, handleDelete}) => {
  const [visible, setVisibility] = useState(false)
  const showWhenVisible = {display: visible ? '' : 'none'}

  return (
    <div style={{
      border: 'solid 1px',
      marginBottom: '5px',
      cursor: 'pointer',
      padding: '5px'
    }}
    >
      <div onClick={() => setVisibility(!visible)}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenVisible}>
        <a href={blog.url}>{blog.url}</a>
        <p>{`${blog.likes} likes`}
          <button onClick={() => handleLike(blog)}>like</button>
        </p>
        <p>{`added by ${blog.user.name}`}</p>
        <button
          onClick={() => handleDelete(blog)}
          style={{display: blog.user.username === user.username ?
              '' :
              'none'
          }}
        >remove</button>
      </div>
    </div>
  )
}


export default Blog