import React from 'react'

const NewBlogForm = ({
  handleBlogCreation,
  handleTitleChange,
  blogTitle,
  handleAuthorChange,
  blogAuthor,
  handleUrlChange,
  blogUrl
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogCreation}>
        <div>
          title:
          <input
            type="text"
            name="title"
            value={blogTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            value={blogAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="url"
            value={blogUrl}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm