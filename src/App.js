import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import loginService from './services/login'
import blogsService from './services/blogs'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import { useField } from "./hooks"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogTitle = useField('text')
  const blogAuthor = useField('text')
  const blogUrl = useField('text')
  const username = useField('text')
  const password = useField('password')

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
      const usernameValue = username.value
      const passwordValue = password.value

      const credentials = { 'username': usernameValue, 'password' : passwordValue }

      const user = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      setUser(user)
      blogsService.setToken(user.token)
    } catch (e) {
      createMessage(e.response.data.error, 'error')
    }
    username.reset()
    password.reset()
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
      title: blogTitle.value,
      author: blogAuthor.value,
      url: blogUrl.value,
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

    blogTitle.reset()
    blogAuthor.reset()
    blogUrl.reset()
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
