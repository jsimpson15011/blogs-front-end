import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogsService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
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


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const credentials = {username, password}
      const user = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      setUser(user)
      blogsService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (e) {
      console.log(e)
      setUsername('')
      setPassword('')
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    blogsService.setToken(null)
    setUser(null)
  }

  const handleBlogCreation = (event) => {
    event.preventDefault()

    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      user: user.id
    }

    blogsService.create(newBlog).then(() => {
      blogsService.getAll()
        .then(newBlogs => {
          setBlogs(newBlogs)
        })
    })
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  const blogsList = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <p>{`${user.name} logged in`}
          <button onClick={handleLogout}>Log out</button>
        </p>
        {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
      </div>
    )
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <h2>log into application</h2>
        <div>
          username
          <input
            type="text"
            name="username"
            value={username}
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="password"
            value={password}
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    )
  }

  const createBlogForm = () => {
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
              onChange={({target}) => setBlogTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              name="author"
              value={blogAuthor}
              onChange={({target}) => setBlogAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              name="url"
              value={blogUrl}
              onChange={({target}) => setBlogUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
  if (user === null) {
    return (
      <div className="App">
        <h2>Log into application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div className="App">
      <h2>blogs</h2>
      {createBlogForm()}
      {blogsList()}
    </div>
  )
}

export default App
