import React from 'react'

const NewBlogForm = ({
  handleBlogCreation,
  blogTitle,
  blogAuthor,
  blogUrl
}) => {
  const blogTitleProps = Object.assign({}, blogTitle)
  delete blogTitleProps.reset

  const blogAuthorProps = Object.assign({}, blogAuthor)
  delete blogAuthorProps.reset

  const blogUrlProps = Object.assign({}, blogUrl)
  delete blogUrlProps.reset

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogCreation}>
        <div>
          title:
          <input {...blogTitleProps}/>
        </div>
        <div>
          author:
          <input {...blogAuthorProps}/>
        </div>
        <div>
          url:
          <input {...blogUrlProps}/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm