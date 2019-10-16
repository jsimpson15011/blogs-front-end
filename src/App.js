import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import loginService from './services/login'
import blogsService from './services/blogs'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])
  useEffect(() => {
    blogsService.getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  const createMessage = (message, type) => {
    setMessage({
      message: message,
      type: type
    })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const blogFormRef = React.createRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const credentials = { username, password }
      const user = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      setUser(user)
      blogsService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (e) {
      createMessage(e.response.data.error, 'error')
      setUsername('')
      setPassword('')
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    blogsService.setToken(null)
    setUser(null)
  }

  const handleBlogCreation = async(event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      user: user.id
    }

    try{
      await blogsService.create(newBlog)
      const newBlogs = await blogsService.getAll()
      setBlogs(newBlogs)

      createMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (e) {
      if (e.response.data.error){
        createMessage(e.response.data.error, 'error')
      } else {
        console.log(e)
        createMessage('something went wrong please try again', 'error')
      }
    }

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  const handleLike = async (blog) => {
    try {
      await blogsService.addLike(blog)
      const newBlogs = await blogsService.getAll()
      setBlogs(newBlogs)
    } catch (e) {
      createMessage(e.response.data.error, 'error')
    }
  }

  const handleDelete = async (blog) => {
    try {
      if (window.confirm(`are you sure you want to delete the blog ${blog.title}`)) {
        await blogsService.deleteBlog(blog)
        const newBlogs = await blogsService.getAll()
        setBlogs(newBlogs)
      }
    } catch (e) {
      createMessage(e.response.data.error, 'error')
    }
  }

  const blogsList = () => {
    const blogsSortedByLikes = blogs.sort((a, b) => {
      return b.likes - a.likes
    })
    return (
      <div className="blog-list">
        <h2>Blogs</h2>
        <p>{`${user.name} logged in`}
          <button onClick={handleLogout}>Log out</button>
        </p>
        {blogsSortedByLikes.map(blog => <Blog
          key = {blog.id}
          blog = {blog}
          user = {user}
          handleLike = {handleLike}
          handleDelete = {handleDelete}
        />
        )}
      </div>
    )
  }

  if (user === null) {
    return (
      <div className="App">
        <Message message = {message}/>
        <h2>Log into application</h2>
        <Togglable buttonLabel = 'login'>
          <LoginForm
            handleLogin = {handleLogin}
            username = {username}
            password = {password}
            handleUsernameChange = {({ target }) => setUsername(target.value)}
            handlePasswordChange = {({ target }) => setPassword(target.value)}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div className="App">
      <Message message = {message}/>
      <h2>blogs</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm
          handleBlogCreation = {handleBlogCreation}
          handleTitleChange = {({ target }) => setBlogTitle(target.value)}
          handleAuthorChange = {({ target }) => setBlogAuthor(target.value)}
          handleUrlChange = {({ target }) => setBlogUrl(target.value)}
          blogTitle = {blogTitle}
          blogAuthor = {blogAuthor}
          blogUrl = {blogUrl}
        />
      </Togglable>
      {blogsList()}
    </div>
  )
}

export default App
